import type { Gif } from '../interfaces/character.interface';
import type { CharacterItem } from '../interfaces/res-characters.interface';

export class GifMapper {
  public static mapCharacterItemToGif(item: CharacterItem): Gif {
    return {
      id: item.id,
      image: item.image,
      name: item.name,
      url: item.url,
    };
  }

  public static mapCharacterItemsToGifArray(items: CharacterItem[]): Gif[] {
    return items.map(this.mapCharacterItemToGif);
  }
}
