import { Component, inject } from '@angular/core';
import { CharacterList } from '../../components/dragonball/character-list/character-list';
import { CharacterAdd } from '../../components/dragonball/character-add/character-add';
import { DragonBallService } from '../../services/dragonball.service';

/**
 * COMPONENTE SMART (Contenedor Inteligente)
 * Este es un componente "Smart" porque sabe de la existencia de servicios externos
 * y maneja la lógica central de la página. Su único trabajo es inyectar servicios,
 * obtener la data y pasársela a sus componentes "Dumb" (CharacterList y CharacterAdd)
 * que solo se encargan de pintar la interfaz.
 */
@Component({
  // Importamos los componentes Standalone que vamos a usar en el HTML de esta página
  imports: [CharacterList, CharacterAdd],
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super-page.html',
})
export class DragonballSuperPage {
  /*
    NUEVA INYECCIÓN DE DEPENDENCIAS (Angular 14+)
    'inject()' reemplaza la necesidad de inyectar servicios en el constructor().

    Ventajas sobre el constructor tradicional:
    1. Código más limpio (menos Boilerplate).
    2. Evita la sobrecarga de constructores gigantes cuando un componente
       necesita 5 o 6 servicios distintos.
    3. Es fundamental para trabajar con funciones avanzadas y factorías.

    Nota: Se declara público para que pueda ser utilizado directamente en el HTML.
  */
  public dragonBallService = inject(DragonBallService);
}
