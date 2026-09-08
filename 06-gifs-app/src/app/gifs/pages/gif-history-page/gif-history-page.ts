import { ActivatedRoute } from '@angular/router';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';

import { GifService } from '../../services/gifs.service';
import { GifList } from '../../components/gif-list/gif-list';

@Component({
  selector: 'app-gif-history-page',
  imports: [GifList],
  templateUrl: './gif-history-page.html',
})
export default class GifHistoryPage {
  /*
    ENFOQUE IMPERATIVO (LEGACY)
    Anteriormente, nos suscribíamos manualmente al Observable 'params'.
    El gran problema de este enfoque era el riesgo de "Memory Leaks" (fugas de memoria):
    si no implementábamos el ciclo de vida 'ngOnDestroy' para matar la suscripción
    manualmente, esta seguía viva consumiendo recursos incluso después de salir de la página.
  */
  // public query = inject(ActivatedRoute).params.subscribe({
  //   next: (params): void => {
  //     console.log({ params });
  //   },
  // });

  /*
    ENFOQUE DECLARATIVO E INTEROP RXJS-SIGNALS (ESTADO DEL ARTE)

    1. RxJS Pipeline: Usamos .pipe(map(...)) para extraer únicamente la propiedad
       'query' del objeto de parámetros antes de que llegue a nuestra variable.

    2. toSignal (El puente reactivo): Convierte un Flujo de Datos asíncrono (Observable)
       en un Estado Reactivo síncrono (Signal).

    Beneficio Arquitectónico (Automated Lifecycle): 'toSignal' se suscribe al Observable
    internamente y, lo más importante, se DESUSCRIBE de manera automática cuando el
    componente se destruye. Logramos un código más limpio, reactivo y 100% seguro
    en gestión de memoria.
  */
  public query = toSignal(inject(ActivatedRoute).params.pipe(map((params) => params['query'])));
  public gifService = inject(GifService);

  /*
    La ventaja de usar inject y no un constructor es que podemos encadenar
    procedimientos, es decir, que dependa del anterior inject
  */
  public gifsByKey = computed(() => this.gifService.getHistoryGifs(this.query()));
}
