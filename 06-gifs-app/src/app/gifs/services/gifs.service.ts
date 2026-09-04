import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';

// Usar 'import type' es una excelente práctica para que el compilador
// elimine estas referencias en tiempo de ejecución (Cero impacto en el Bundle).
import type { CharacterResponse } from '../interfaces/res-characters.interface';
import type { Observable } from 'rxjs';
import type { Gif } from '../interfaces/character.interface';
import { GifMapper } from '../mapper/gif.mapper';

/*
  SINGLETON PATTERN & TREE SHAKING
  Al declarar providedIn: 'root', Angular crea una única instancia de este servicio
  (Singleton) compartida en toda la aplicación. Además, permite que el compilador
  aplique 'Tree Shaking' (eliminar código muerto) si el servicio nunca llega a usarse.
*/
@Injectable({ providedIn: 'root' })
export class GifService {
  /*
    INYECCIÓN DE DEPENDENCIAS MODERNA
    Utilizamos la función inject() para obtener el HttpClient. Esto reduce el
    'boilerplate' (código repetitivo) del constructor tradicional y permite un
    código más limpio y funcional. Se declara como 'readonly' para proteger la
    referencia y evitar mutaciones accidentales del cliente de red.
  */
  private readonly http = inject(HttpClient);

  /*
    ESTADO REACTIVO CENTRALIZADO (Single Source of Truth)
    Este Signal actúa como el almacén global (Store) para los GIFs en tendencia.
    Cualquier componente que lo lea se actualizará automáticamente cuando su valor mute,
    eliminando la necesidad de pasar datos manualmente entre componentes.
  */
  public trendingGifs = signal<Gif[]>([]);

  public trendingGifsLoading = signal<boolean>(true);

  /*
    INICIALIZACIÓN TEMPRANA (Eager Loading)
    Al invocar la carga de datos directamente en el constructor del servicio,
    garantizamos que la petición de red se dispare en el instante en que el
    servicio es inyectado por primera vez en cualquier parte de la app.
  */
  constructor() {
    this.loadTrendingGifs();
  }

  public loadTrendingGifs(): void {
    /*
      PETICIÓN HTTP TIPADA
      1. Tipado Estricto: Al pasar <CharacterResponse> al método GET, establecemos
         un contrato con la respuesta esperada de la API.
      2. Inmutabilidad en Params: Pasamos los Query Parameters como un objeto de
         configuración en lugar de concatenarlos en la URL, previniendo errores de sintaxis.
    */
    this.http
      .get<CharacterResponse>(`${environment.apiUrl}/character`, {
        params: {
          page: 1,
        },
      })
      .subscribe({
        next: (response: CharacterResponse): void => {
          /*
            ANTI-CORRUPTION LAYER (Mapeo de DTO a Entidad de Dominio)
            No exponemos el contrato del Backend (CharacterResponse) al resto de la aplicación.
            En su lugar, utilizamos un Mapper para transformar los datos externos
            a nuestra propia interfaz de dominio (Gif).

            Beneficio Arquitectónico: Si el día de mañana la API externa cambia sus
            propiedades (ej. 'image' cambia a 'imageUrl' o cambian de proveedor),
            nuestra aplicación NO se rompe. Solo modificamos la clase GifMapper y
            el resto del sistema frontend permanece intacto.
          */
          const gifs = GifMapper.mapCharacterItemsToGifArray(response.results);

          // Mutamos el estado global, notificando a toda la UI instantáneamente.
          this.trendingGifs.set(gifs);

          this.trendingGifsLoading.set(false);
          console.log(gifs);
        },
      });
  }
}
