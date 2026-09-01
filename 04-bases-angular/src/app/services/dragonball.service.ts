import { Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

/*
  Este servicio trabaja con la inyección de dependencia y
  funciona como un singleton, es decir, la misma instancias siempre,
  sirve como lugar centralizado de información

  providedIn: root - indica que estará global en mi aplicación

  Se pueden crear servicios que existan en un solo scope,
  es decir, modulo o feature
*/
@Injectable({ providedIn: 'root' })
export class DragonBallService {
  /*
    ESTADO PRINCIPAL (Data List)
    Lista simulada que alimenta la vista. En la vida real,
    esto se llenaría llamando a un servicio HTTP.
  */
  public characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    { id: 2, name: 'Vegeta', power: 8000 },
  ]);

  public addCharacters(character: Character): void {
    this.characters.update((currentCharacters) => [...currentCharacters, character]);
  }
}
