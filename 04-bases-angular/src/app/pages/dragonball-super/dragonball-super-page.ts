import { Component, inject } from '@angular/core';
import { CharacterList } from '../../components/dragonball/character-list/character-list';
import { CharacterAdd } from '../../components/dragonball/character-add/character-add';
import { DragonBallService } from '../../services/dragonball.service';

@Component({
  imports: [CharacterList, CharacterAdd],
  selector: 'app-dragonball-super',
  templateUrl: './dragonball-super-page.html',
})
export class DragonballSuperPage {
  //Consumir servicios - se recomienda hacerlo de esta manera
  public dragonBallService = inject(DragonBallService);
}
