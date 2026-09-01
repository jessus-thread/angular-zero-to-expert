import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * COMPONENTE: App (Root Component)
 *
 * Componente raíz de la aplicación. Actúa como el contenedor principal
 * donde se montará el sistema de rutas y el resto de la interfaz.
 */
@Component({
  /*
    Define el selector CSS por el cual Angular identificará y montará
    este componente en el DOM (index.html).
  */
  selector: 'app-root',

  /*
    Al ser un componente Standalone (por defecto en Angular moderno), debemos declarar
    explícitamente sus dependencias. Aquí importamos directivas, pipes u otros componentes.
  */
  imports: [RouterOutlet],

  // Ruta al archivo externo que contiene la estructura HTML (View) de este componente.
  templateUrl: './app.html',

  /*
    Ruta al archivo externo de estilos. Estos estilos están encapsulados por defecto
    (ViewEncapsulation.Emulated), lo que significa que no afectarán a otros componentes.
  */
  // styleUrl: './app.css',
})
export class App {
  /**
   * Estado reactivo del título de la aplicación.
   * - 'protected': Limita el acceso a esta clase y su template (HTML), evitando mutaciones externas.
   * - 'readonly': Asegura que la referencia del Signal no sea reasignada accidentalmente.
   */
  protected readonly title: Signal<string> = signal('jessus-thread');
}
