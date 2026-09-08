import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
})
/*
    LIFECYCLE HOOK: ngAfterViewInit
    Este método del ciclo de vida se dispara exactamente una vez después de que Angular
    ha inicializado y renderizado completamente la vista del componente (DOM) y
    las vistas de todos sus componentes hijos.

    Caso de uso (Arquitectura): Es el punto seguro y garantizado en el tiempo
    para interactuar directamente con elementos nativos (usando ViewChild / viewChild())
    o para instanciar APIs del navegador y librerías de terceros (como gráficas,
    mapas o Intersection Observers) que requieren que el HTML ya exista físicamente en pantalla.
  */
export default class TrendingPage implements AfterViewInit {
  /*
    INYECCIÓN DE DEPENDENCIAS FUNCIONAL (Functional DI)
    Utilizamos la función inject() como el estándar moderno para la resolución de dependencias.

    A diferencia del constructor tradicional, este enfoque funcional permite solicitar
    dependencias no solo dentro de las clases, sino también en funciones aisladas
    (como Guards, Interceptors o Resolvers), con la única restricción de ser invocada
    dentro del "Injection Context" (Contexto de Inyección) activo de Angular.

    Beneficio Arquitectónico: Reduce el código repetitivo (boilerplate) en la firma
    de la clase y facilita enormemente la herencia de componentes, ya que elimina
    la necesidad de pasar dependencias a través del método super().
  */
  public gifService = inject(GifService);

  /*
    SIGNAL-BASED VIEW QUERIES (Consultas de Vista Reactivas)

    1. viewChild: Es la evolución moderna del decorador @ViewChild. En lugar de mutar
       una variable de clase, retorna un Signal reactivo que contiene la referencia al
       elemento del DOM (o componente hijo). Esto elimina problemas de sincronización
       y hace que el elemento sea reactivo al estado de Angular.

    2. viewChildren: Su contraparte plural, retorna un Signal con un arreglo de
       múltiples referencias (ideal para listas dinámicas renderizadas con @for).

    3. Naming Convention (Sufijo 'Ref'): Al nombrar la variable 'scrollDivRef',
       aplicamos una convención de 'Clean Code' que indica visualmente que esta variable
       no almacena datos de negocio, sino una abstracción del DOM nativo (ElementRef).

    4. Type Safety Estricto: Al definir <ElementRef<HTMLDivElement>>, instruimos
       al compilador de TypeScript sobre el tipo exacto de nodo HTML. Esto nos
       garantiza autocompletado seguro para propiedades como 'scrollTop' o 'clientHeight',
       lo cual es vital para cálculos geométricos como el Scroll Infinito.
  */
  public scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  public scrollStateService = inject(ScrollStateService);

  public ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  public onScroll(event: Event): void {
    /*
      EXTRACCIÓN DEL NODO DOM NATIVO (DOM Unwrapping)

      1. Abstracción vs Realidad: Angular envuelve los elementos de la vista en una
         capa de seguridad llamada 'ElementRef'. Al acceder a '.nativeElement',
         cruzamos esa frontera del framework para interactuar directamente con la
         API pura del navegador (HTMLDivElement).

      2. Safe Navigation (Encadenamiento Opcional): Utilizamos el operador '?.' porque
         las consultas de vista pueden ser 'undefined' si el elemento aún no se ha
         renderizado (por ejemplo, si estuviera oculto temporalmente por un @if).
         Esto previene el temido error "Cannot read properties of undefined".
    */
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeigth = scrollDiv.scrollHeight;
    /*
      Damos 300 px de gracia para que se dispare la petición antes
      de llegar al final
    */
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeigth;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }

    console.log({ scrollTop, clientHeight, scrollHeigth, isAtBottom });
  }
}
