import { Component } from '@angular/core';

/*
  USO DEL PATH ALIAS
  Gracias al tsconfig.json, esta importación es limpia y absoluta.
  No importa en qué sub-carpeta estemos, '@environments/...' siempre funcionará.
*/
import { environment } from '@environments/environment.development';

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.html',
})
export class SideMenuHeader {
  /*
    EL PUENTE HACIA EL HTML (Binding de variables globales)
    El archivo HTML de Angular NO tiene acceso a las importaciones del archivo TS.
    Si intentaras escribir {{ environment.companyName }} en el HTML, Angular fallaría.
    Para solucionarlo, asignamos el objeto importado a una propiedad pública ('envs')
    de la clase. Ahora el HTML sí puede leerlo.
  */
  public envs = environment;
}
