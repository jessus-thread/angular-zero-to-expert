import { Component, input } from '@angular/core';

/*
  TYPE-ONLY IMPORTS (Importaciones exclusivas de tipos)
  Excelente práctica. Al usar la palabra clave 'type', le indicamos al
  compilador de TypeScript que 'Character' solo se usa para tipado estático.
  Ventaja: Al compilar a JavaScript puro, esta línea se elimina por completo
  (cero costo en tiempo de ejecución) y previene problemas de dependencias
  circulares entre archivos.
*/
import type { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.html',
})
export class CharacterList {
  /*
    NUEVA API DE INPUTS BASADOS EN SIGNALS (Angular 17.1+)
    Esto reemplaza al tradicional decorador '@Input()'.

    Ventajas del Signal Input:
    1. Reactividad nativa: Al ser un Signal, si el arreglo de personajes cambia
       en el componente padre, este hijo se repinta automáticamente y de forma
       optimizada (especialmente si usamos OnPush).
    2. Sin decoradores: Código más limpio y funcional.

    input.required():
    Este es el escudo de seguridad más grande que Angular te puede dar.
    Le dice al compilador: "Si un desarrollador intenta usar <dragonball-character-list>
    en su HTML pero OLVIDA pasarle el atributo [characters] o [listName], no compiles
    el proyecto y arroja un error".
    Con el viejo @Input(), esto fallaba silenciosamente en tiempo de ejecución.
  */
  public characters = input.required<Character[]>();
  public listName = input.required<string>();
}
