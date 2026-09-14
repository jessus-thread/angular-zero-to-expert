import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  /*
    Angular recomienda no colocar on a las variables
    que emiten evento, por ejemplo, esto es incorrecto:

    onValue
  */
  public value = output<string>();
  public placeholder = input.required<string>();

  public onSearch(value: string): void {
    const cleanValue: string = value.trim();

    if (!cleanValue.length) return;

    this.value.emit(cleanValue);
  }
}
