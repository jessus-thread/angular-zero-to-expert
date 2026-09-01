import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.html',
})
export class CharacterAdd {
  /*
    ESTADOS DEL FORMULARIO
    Variables que capturan la entrada del usuario temporalmente antes de ser guardadas.
  */
  public name = signal<string>('');
  public power = signal<number>(0);

  public newCharacter = output<Character>();

  public addCharacter(): void {
    // 1. Validación temprana (Early Return) para evitar datos nulos o inválidos.
    if (!this.name() || !this.power() || this.power() <= 0) return;

    // 2. Construcción del nuevo objeto respetando la interfaz.
    // Ojo: Usar .length + 1 para el ID puede causar colisiones si se implementa
    // un método para eliminar personajes. Por ahora funciona para el ejemplo.
    const character: Character = {
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    };

    this.newCharacter.emit(character);

    /*
      3. MUTACIÓN INMUTABLE DE ARREGLOS CON SIGNALS
      Se usa .update() porque necesitamos el arreglo viejo para añadir el nuevo.
      La sintaxis [...currentCharacters, character] es el operador Spread (Propagación).
      Esto crea un NUEVO arreglo en memoria que contiene todo lo viejo más lo nuevo.
      Es la forma correcta de actualizar arreglos reactivos en lugar de usar un .push().
    */

    // 4. Limpieza del formulario
    this.resetFields();
  }

  /*
    MÉTODOS PRIVADOS
    Declarar esto como 'private' es una excelente práctica. Le indica a otros
    desarrolladores (y a Angular) que este método es de uso interno de la clase
    y nunca debería ser llamado desde el HTML u otro componente.
  */
  private resetFields(): void {
    this.name.set('');
    this.power.set(0);
  }
}
