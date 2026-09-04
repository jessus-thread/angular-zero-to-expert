import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from '../../../services/gifs.service';

interface MenuOptions {
  icon: string;
  label: string;
  route: string;
  subLabel: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {
  /*
    ESTADO ESTÁTICO vs ESTADO REACTIVO (Signals)

    - Datos puros (Arreglos/Variables): Los usamos para información constante o
      estática (Hardcoded). Envolver datos inmutables en un Signal añade un
      "overhead" (costo de memoria) innecesario, ya que Angular no necesita
      rastrear cambios que nunca van a ocurrir.

    - Signals: Solo los utilizamos cuando el valor va a mutar durante el ciclo
      de vida del componente (ej. un menú basado en roles de usuario) y
      necesitamos notificar a Angular para que repinte el HTML (Re-render).
  */
  protected readonly menuOptions: MenuOptions[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search',
    },
  ];

  protected readonly gifService = inject(GifService);
}
