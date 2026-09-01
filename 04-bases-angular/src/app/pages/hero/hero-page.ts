import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  templateUrl: './hero-page.html',
  /*
    CommonModule importa directivas clásicas (ngIf, ngFor) y Pipes nativos (uppercase, lowercase, date).
    En versiones muy recientes de Angular (17+), puedes importar solo lo que usas,
    por ejemplo: imports: [UpperCasePipe], lo cual mejora el tree-shaking.
  */
  imports: [CommonModule],
})
export class HeroPage {
  /*
    ESTADO MUTABLE (WritableSignal)
    Variables que pueden cambiar de valor usando .set() o .update()
  */
  public name: WritableSignal<string> = signal('Ironman');
  public age: WritableSignal<number> = signal(45);

  /*
    SEÑAL COMPUTADA (El poder de la Memoización)
    Como bien dijiste, es de solo lectura. Pero su mayor ventaja es el "Caché".
    Esta función NO se vuelve a ejecutar a menos que this.name() o this.age() cambien.
    Si otro Signal (ej. otra variable en la pantalla) cambia y provoca un renderizado,
    heroDescription devolverá su valor en caché instantáneamente sin recalcular nada.
  */
  protected readonly heroDescription: Signal<string> = computed((): string => {
    return `${this.name()} - ${this.age()}`;
  });

  protected readonly capitalizedName: Signal<string> = computed((): string => {
    return this.name().toUpperCase();
  });

  /*
    ❌ ANTIPATRÓN CLÁSICO: Métodos en el HTML
    Si llamaras a {{ getHeroDescription() }} en el HTML, Angular ejecutaría esta
    función decenas de veces por segundo en cada ciclo de detección de cambios
    (si no tuvieras OnPush). Por eso los Signals Computados reemplazan esta vieja práctica.
  */
  public getHeroDescription(): string {
    return `${this.name()} - ${this.age()}`;
  }

  /*
    Mutaciones de estado.
    Se usa .set() porque no nos importa el valor que tenían antes (no dependemos
    del estado previo). Simplemente sobrescribimos la caja.
  */
  public changeHero(): void {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  public resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }

  public chageAge(): void {
    this.age.set(60);
  }
}
