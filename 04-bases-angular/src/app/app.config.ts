import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

/**
 * ARCHIVO: app.config.ts
 *
 * Objeto de configuración global de la aplicación.
 * En la arquitectura Standalone, este archivo reemplaza la sección 'providers' e 'imports'
 * del tradicional app.module.ts. Define las dependencias que estarán disponibles
 * a nivel raíz (Root Environment Injector) para toda la aplicación.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Registra listeners globales para capturar errores no manejados en el navegador
    provideBrowserGlobalErrorListeners(),

    // Inicializa el sistema de enrutamiento y lo vincula con la API History del navegador
    provideRouter(routes),
    // HashStrategy
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
};
