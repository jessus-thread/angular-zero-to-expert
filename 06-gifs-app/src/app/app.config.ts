import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

/*
  CONFIGURACIÓN GLOBAL (BOOTSTRAP)
  En aplicaciones Standalone, este objeto reemplaza al antiguo app.module.ts.
  Aquí registramos los proveedores (Providers) y dependencias globales
  que estarán disponibles en toda la aplicación mediante Inyección de Dependencias.
*/
export const appConfig: ApplicationConfig = {
  providers: [
    // Captura excepciones globales no manejadas y las reporta en consola.
    provideBrowserGlobalErrorListeners(),

    // Habilita el sistema de enrutamiento principal.
    provideRouter(routes),

    /*
      CLIENTE HTTP MODERNO
      Por defecto, Angular utiliza el motor heredado XMLHttpRequest (XHR).
      Al usar 'withFetch()', instruimos al framework a utilizar la API Fetch nativa
      del navegador. Esto optimiza el rendimiento de las peticiones de red,
      reduce el 'overhead' y es un requisito recomendado para arquitecturas modernas
      con Server-Side Rendering (SSR).
    */
    provideHttpClient(withFetch()),
  ],
};
