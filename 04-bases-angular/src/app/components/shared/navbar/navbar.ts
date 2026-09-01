import { Component, signal, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/*
  INTERFAZ DE DOMINIO
  Excelente práctica. Definir la forma de los datos antes de usarlos
  previene errores de tipografía y habilita el autocompletado inteligente.
*/
interface ItemNav {
  path: string;
  name: string;
  isPathInitial: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',

  /*
    ⚠️ MEJORA ARQUITECTÓNICA:
    ¡Ya no necesitas el CommonModule!
    En versiones antiguas (Angular 16 y menor), necesitabas CommonModule para poder
    usar *ngIf y *ngFor. Con el nuevo control de flujo (@if, @for), la lógica está
    integrada directamente en el compilador de Angular. Puedes borrarlo para hacer
    tu aplicación más ligera (Tree-shaking).
  */
  imports: [RouterLink, RouterLinkActive],
})
export class Navbar {
  /*
    ESTADO REACTIVO
    Usar un Signal de solo lectura (protected readonly) con un tipado estricto <ItemNav[]>
    es la mejor manera de asegurar que nadie mute las rutas accidentalmente desde fuera.

    ⚠️ NOTA DE RUTAS:
    Añadí el '/' a 'hero' y 'dragonball'. Si las dejas sin '/' inicial, Angular las
    tratará como rutas relativas. Si estuvieras en /hero y haces clic en dragonball,
    Angular intentaría ir a /hero/dragonball. El '/' fuerza rutas absolutas.
  */
  protected readonly routes: Signal<ItemNav[]> = signal([
    { path: '/', name: 'Contador', isPathInitial: true },
    { path: '/hero', name: 'Hero', isPathInitial: false },
    { path: '/dragonball', name: 'Dragon Ball', isPathInitial: false },
    { path: '/dragonball-super', name: 'Dragon Ball Super', isPathInitial: false },
  ]);
}
