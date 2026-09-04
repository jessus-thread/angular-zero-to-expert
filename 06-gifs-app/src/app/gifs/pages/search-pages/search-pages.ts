import { Component, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/character.interface';

@Component({
  selector: 'app-search-pages',
  imports: [GifList],
  templateUrl: './search-pages.html',
})
export default class SearchPages {
  public gifsService = inject(GifService);
  public gifs = signal<Gif[]>([]);

  public onSearch(query: string): void {
    this.gifsService.searchGifs(query).subscribe({
      next: (response): void => {
        this.gifs.set(response);
      },
    });
  }
}
