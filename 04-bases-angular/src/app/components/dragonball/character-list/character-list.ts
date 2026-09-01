import { Component, input } from '@angular/core';
/*
  Es buena practica colocarle el type cuando sea una interfaz
*/
import type { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-list',
  templateUrl: './character-list.html',
})
export class CharacterList {
  // Recibe datos del componente padre
  public characters = input.required<Character[]>();
  public listName = input.required<string>();
}
