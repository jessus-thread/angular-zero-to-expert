import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountries } from '../interfaces/rest-countries.interface';

const API_URL = 'https://api.restcountries.com';
const API_KEY = 'rc_live_42541c345a4f4f0699744964f7e05d86';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);

  public searchCapital(query: string) {
    const queryLowerCase: string = query.toLowerCase();

    /*
      INYECCIÓN DE HEADERS HTTP & AUTENTICACIÓN
      Pasamos un objeto al segundo parámetro del HttpClient.
      Utilizamos 'Template Literals' para construir el token bajo el
      estándar "Bearer Authentication", separando la palabra 'Bearer' y la llave
      por un espacio, tal como lo exige el protocolo HTTP seguro.
    */
    return this.http.get<RESTCountries[]>(`${API_URL}/countries/v5?capital=${queryLowerCase}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
  }
}
