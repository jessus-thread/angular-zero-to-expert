import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.html',
})
export class CharacterAdd {
  /*
    ESTADOS DEL FORMULARIO LOCAL
    Variables que capturan la entrada del usuario temporalmente.
    Al estar en un Dumb Component, este estado es efímero (se borra al resetear).
  */
  public name = signal<string>('');
  public power = signal<number>(0);

  /*
    NUEVA API DE EVENTOS (Angular 17.3+)
    'output()' reemplaza al tradicional decorador '@Output()'.
    Ventajas de la nueva sintaxis:
    1. No necesitas importar ni instanciar un 'EventEmitter'.
    2. Es 100% Type-Safe (Tipado seguro): Le decimos exactamente qué tipo
       de dato va a emitir (<Character>).
    3. Se alinea con la nueva arquitectura funcional de Angular (igual que los Signals).
  */
  public newCharacter = output<Character>();

  public addCharacter(): void {
    // 1. Validación temprana (Early Return).
    if (!this.name() || !this.power() || this.power() <= 0) return;

    // 2. Construcción del objeto (Payload).
    const character: Character = {
      /*
        Se reemplazó el .length + 1 por un Math.random() para evitar colisiones de IDs
        ya que este componente hijo no tiene forma de saber cuántos elementos
        existen en el arreglo global del servicio. En un proyecto real,
        este ID lo generaría la base de datos (Backend) usando UUIDs.
      */
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    };

    /*
      3. COMUNICACIÓN HIJO -> PADRE
      Este componente es "Dumb" (Tonto). Su trabajo no es modificar la lista,
      ni llamar al servicio, ni hacer peticiones HTTP.
      Su único trabajo es gritarle al componente Padre:
      "¡Oye, el usuario terminó de llenar el formulario, aquí están los datos!".
      El Padre usará (newCharacter)="..." en el HTML para atrapar este objeto.
    */
    this.newCharacter.emit(character);

    // 4. Limpieza del formulario
    this.resetFields();
  }

  /*
    MÉTODOS PRIVADOS (Encapsulamiento)
    Protege el método para que solo pueda ejecutarse desde adentro de esta clase.
  */
  private resetFields(): void {
    this.name.set('');
    this.power.set(0);
  }
}
