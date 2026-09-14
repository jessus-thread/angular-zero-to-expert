import { Component, inject, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { RESTCountries } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  private readonly service = inject(CountryService);

  public isLoading = signal<boolean>(false);
  public isError = signal<string | null>(null);
  public countries = signal<RESTCountries[]>([]);

  public onSearch(query: string) {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.service.searchCapital(query).subscribe({
      next: (countries): void => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (error): void => {
        console.log(error);
      },
    });
  }
}
