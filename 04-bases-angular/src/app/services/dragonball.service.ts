import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = (): Character[] => {
  /*
    1. PROTECCIÓN SSR (Server-Side Rendering)
    Si ejecutamos la app en un servidor Node.js (Angular Universal / SSR),
    el objeto 'window' o 'localStorage' no existe y la app colapsará.
    Esta línea verifica si estamos en el navegador antes de intentar leer.
  */
  if (typeof window === 'undefined') return [];

  const characters = localStorage.getItem('characters');

  /*
    2. PROTECCIÓN DE INTEGRIDAD (Try/Catch)
    Como indicaste, el usuario puede manipular el localStorage.
    Si el usuario escribe un JSON inválido manualmente en el navegador,
    'JSON.parse' lanzará un error fatal. Lo envolvemos en un bloque try-catch
    para que, si algo falla, la app sobreviva y retorne un arreglo vacío.
  */
  try {
    return characters ? JSON.parse(characters) : [];
  } catch (error) {
    console.error('El localStorage fue manipulado o está corrupto', error);
    return [];
  }
};

/*
  DECORADOR @Injectable (Inyección de Dependencias)
  Le dice a Angular que esta clase puede ser inyectada en el constructor
  (o mediante la función inject()) de cualquier componente u otro servicio.

  providedIn: 'root'
  1. Patrón Singleton: Le indica a Angular que cree UNA SOLA INSTANCIA de esta
     clase en la memoria para toda la aplicación. Si el Componente A agrega un
     personaje, el Componente B lo verá inmediatamente porque ambos están
     leyendo exactamente el mismo archivo en memoria.
  2. Tree-Shaking: Si por alguna razón creas este servicio pero nunca lo inyectas
     en ningún componente, el compilador de Angular es lo suficientemente
     inteligente para no incluirlo en el código final de producción (ahorrando KB).

  Nota Arquitectónica: Si cambiaras 'root' por el nombre de un módulo específico,
  o lo proveyeras directamente en el arreglo 'providers' de un componente,
  romperías el Singleton global y crearías instancias aisladas (útil para casos
  muy específicos, pero no para un estado global).
*/
@Injectable({ providedIn: 'root' })
export class DragonBallService {
  /*
    GLOBAL STATE (Mini-Store Reactivo)
    Al poner un Signal dentro de un servicio Singleton, acabas de crear un gestor
    de estado global. Es la versión moderna, nativa y ligera de librerías
    complejas como NgRx o Redux.
    Cualquier componente de la aplicación puede suscribirse a 'characters()'
    y reaccionar instantáneamente a sus cambios.
  */
  public characters = signal<Character[]>(loadFromLocalStorage());

  /*
    EFECTOS REACTIVOS (Side Effects)
    Un effect() es una operación que se ejecuta automáticamente al menos una vez,
    y vuelve a ejecutarse CADA VEZ que alguna de las Señales (Signals) que lee
    en su interior cambia de valor.

    ⚠️ REGLAS DE ORO DE LOS EFECTOS:
    1. NO hacer peticiones HTTP: Los efectos son síncronos por naturaleza. Hacer
       llamadas asíncronas aquí puede generar condiciones de carrera y múltiples
       peticiones no deseadas.
    2. NO mutar otras señales: Por defecto, Angular bloquea la escritura de Signals
       dentro de un effect() para evitar ciclos infinitos (loops).
    3. Responsabilidad Única: Un efecto debe hacer una sola cosa (ej. guardar en
       LocalStorage, manipular el DOM nativo o imprimir logs).

    Nota Arquitectónica:
    Asignar el effect() a una propiedad de la clase (como 'saveToLocalStorage')
    en lugar de dejarlo anónimo en el constructor es una excelente práctica.
    Autodocumenta el código y nos permite guardar su referencia por si en el
    futuro necesitamos destruirlo manualmente usando .destroy().
  */
  public saveToLocalStorage = effect(() => {
    /*
      RASTREO AUTOMÁTICO DE DEPENDENCIAS (Dependency Tracking)
      No tenemos que decirle a Angular cuándo ejecutar este bloque.
      Al invocar this.characters() aquí adentro, Angular lo registra automáticamente
      como una dependencia. Cuando el Signal characters() se actualice en el servicio,
      este código se volverá a disparar por sí solo.
    */
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });

  /*
    LÓGICA DE NEGOCIO CENTRALIZADA
    El componente ya no necesita saber CÓMO se agrega un personaje,
    solo necesita mandarle los datos (el "Payload") al servicio y este se encarga.
  */
  public addCharacters(character: Character): void {
    /*
      MUTACIÓN INMUTABLE
      Se utiliza el operador Spread (...) para fabricar un nuevo arreglo.
      Al cambiar la referencia en memoria del arreglo, el Signal notifica el
      cambio a TODOS los componentes de la aplicación que estén usando este estado,
      forzándolos a repintar su HTML simultáneamente.
    */
    this.characters.update((currentCharacters) => [...currentCharacters, character]);
  }
}
