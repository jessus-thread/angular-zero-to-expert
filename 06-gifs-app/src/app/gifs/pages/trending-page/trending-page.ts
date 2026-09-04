import { Component, inject } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {
  /*
  inject sirve para inyectar dependencias y tambien se pueden
  usar en funciones siempre y cuando estemos en el contexto
  de Angular
  */
  public gifService = inject(GifService);
}
