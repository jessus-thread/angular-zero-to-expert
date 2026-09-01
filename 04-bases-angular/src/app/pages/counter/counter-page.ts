import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';

@Component({
  /*
    Faltaría el 'selector' si se va a usar como componente anidado,
    pero si es una página ruteada directamente (RouterOutlet), esto es válido.
  */
  templateUrl: './counter-page.html',

  /*
    ESTRATEGIA DE DETECCIÓN DE CAMBIOS (El escudo de rendimiento)
    ChangeDetectionStrategy.OnPush desactiva la revisión automática de Angular
    para este componente. Le dice: "No me revises en cada ciclo, yo me encargo
    de avisarte cuando algo cambie (o un Signal lo hará por mí)".
    Esto mejora drásticamente el rendimiento en aplicaciones grandes.
  */
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterPage {
  /*
    ❌ ENFOQUE TRADICIONAL (Depende de Zone.js)
    Angular tiene que revisar TODO el componente para saber si esto cambió.
  */
  public counter: number = 0;

  /*
    ✅ ENFOQUE MODERNO (Reactividad Granular con Signals)
    Angular sabe exactamente cuándo, dónde y qué cambió sin revisar el resto de la app.
  */
  public counterSignal: WritableSignal<number> = signal(0);

  constructor() {
    setInterval((): void => {
      /*
        EL FENÓMENO DEL "PIGGYBACKING" (Ir a cuestas)
        Si descomentas la siguiente línea (this.counter += 1), el HTML del contador
        tradicional se actualizará mágicamente, a pesar del OnPush. ¿Por qué?

        1. 'this.counter += 1' cambia la memoria, pero OnPush bloquea el renderizado.
        2. PERO la siguiente línea (counterSignal.update) le grita a Angular:
           "¡Oye, repinta esta vista ahora mismo!".
        3. Al verse obligado a repintar por el Signal, Angular lee de nuevo todo el HTML
           de este componente y "de paso" extrae el valor más reciente de 'counter'.

        La variable tradicional se cuela (hace piggybacking) en el ciclo de
        renderizado provocado por el Signal. Si comentas el Signal, el OnPush
        vuelve a bloquear al contador tradicional dejándolo congelado en pantalla.
      */
      // this.counter += 1;

      this.counterSignal.update((currentValue) => currentValue + 1);
    }, 2000);
  }

  public increaseBy(value: number): void {
    /*
      Mutación tradicional.
      Afecta la memoria, pero si se llama desde un contexto que Angular no detecta
      (por OnPush), la pantalla no se actualizará a menos que haya piggybacking.
    */
    this.counter += value;

    /*
      Mutación reactiva basada en estado previo.
      .update() recibe una función pura. Garantiza que estamos operando
      sobre el estado más reciente, evitando condiciones de carrera (Race Conditions).
    */
    this.counterSignal.update((currentValue) => currentValue + value);
  }

  public subractBy(value: number): void {
    this.counter -= value;
    this.counterSignal.update((currentValue) => currentValue - value);
  }

  public resetCounter(): void {
    // Reasignación tradicional
    this.counter = 0;

    /*
      Reasignación reactiva absoluta.
      .set() ignora el valor anterior y sobrescribe la caja con un valor nuevo.
    */
    this.counterSignal.set(0);
  }
}
