import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    /*
      CARGA PEREZOSA (Lazy Loading) DE COMPONENTES STANDALONE
      Al usar `loadComponent: () => import(...)`, Angular NO descarga el código
      de este componente (ni de sus dependencias exclusivas) cuando el usuario
      entra a la página de inicio. El navegador solo hará la petición HTTP
      para descargar el archivo JavaScript de este componente cuando el usuario
      realmente intente acceder a la ruta '/dashboard'.

      🔥 TRUCO DE EXPORTACIÓN POR DEFECTO (Default Export):
      Tradicionalmente, había que encadenar una promesa para indicar qué clase instanciar:
      `import('./...').then(m => m.DashboardPage)`
      Al poner `export default class DashboardPage` en el archivo del componente,
      Angular infiere automáticamente qué debe cargar, limpiando enormemente este archivo de rutas.
    */
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page'),

    /*
      RUTAS HIJAS (Child Routes)
      Define sub-rutas que se renderizarán DENTRO del componente padre ('dashboard').
      Para que esto funcione, el componente `DashboardPage` DEBE tener un
      <router-outlet></router-outlet> en su propio HTML.
      Así, cuando el usuario visite '/dashboard/trending', Angular renderizará
      'DashboardPage' y, dentro del hueco de su router-outlet, inyectará 'TrendingPage'.
    */
    children: [
      {
        path: 'trending',
        // También cargados perezosamente. Solo se descargan si se navega a ellos.
        loadComponent: () => import('./gifs/pages/trending-page/trending-page'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-pages/search-pages'),
      },
      /*
        FALLBACK DE RUTAS HIJAS
        Si el usuario entra a '/dashboard/cualquier-cosa-rara', lo enviamos
        a la sub-ruta 'trending'.
        Nota: Al ser relativo, redirige a '/dashboard/trending'.
      */
      {
        path: '**',
        redirectTo: 'trending',
      },
    ],
  },
  /*
    FALLBACK GLOBAL (Wildcard Route)
    Captura cualquier URL raíz inexistente (ej. '/no-existe') o el path vacío ('/')
    y lo redirige a nuestra sección principal ('/dashboard').
    ⚠️ IMPORTANTE: Siempre debe ir al final del arreglo global de rutas.
  */
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
