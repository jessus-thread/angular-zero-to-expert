import { Routes } from '@angular/router';
import { CountryLayout } from './layouts/CountryLayout/CountryLayout';
import { ByCapitalPage } from './pages/by-capital-page/by-capital-page';
import { ByCountryPage } from './pages/by-country-page/by-country-page';
import { ByRegionPage } from './pages/by-region-page/by-region-page';
import { CountryPage } from './pages/country-page/country-page';

export const countryRoutes: Routes = [
  /*
    No hacemos Lazy Loading por que damos por hecho que todas
    las personas verán este componente
  */
  {
    path: '',
    component: CountryLayout,
    children: [
      {
        path: 'by-capital',
        component: ByCapitalPage,
      },
      {
        path: 'by-country',
        component: ByCountryPage,
      },
      {
        path: 'by-region',
        component: ByRegionPage,
      },
      {
        path: 'by/:code',
        component: CountryPage,
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
  // {
  //   path: 'country',
  // },
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
];

export default countryRoutes;
