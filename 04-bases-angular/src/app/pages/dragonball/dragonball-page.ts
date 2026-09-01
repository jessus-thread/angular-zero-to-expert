import { Component, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  imports: [],
  selector: 'app-dragonball',
  templateUrl: './dragonball-page.html',
})
export class DragonballPage {
  public name = signal<string>('');
  public power = signal<number>(0);

  public characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 3, name: 'Piccolo', power: 3000 },
    // { id: 4, name: 'Yamcha', power: 500 },
  ]);

  public addCharacter(): void {
    if (!this.name() || !this.power() || this.power() <= 0) return;

    const character: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    this.characters.update((currentCharacters) => [...currentCharacters, character]);

    this.resetFields();
  }

  private resetFields(): void {
    this.name.set('');
    this.power.set(0);
  }
}
