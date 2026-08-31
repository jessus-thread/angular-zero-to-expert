import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * ARCHIVO: main.ts
 *
 * Punto de entrada principal (Entry Point) de la aplicación Angular.
 * Este archivo es ejecutado por el bundler (Webpack/Vite) al iniciar la app.
 * Su objetivo es arrancar el framework, montar el componente raíz en el DOM
 * y configurar el árbol principal de inyección de dependencias.
 */

/*
  Se utiliza bootstrapApplication (enfoque moderno Standalone) en lugar de
  platformBrowserDynamic (NgModules)
*/
bootstrapApplication(App, appConfig).catch((err) =>
  console.error('Error durante el arranque de la aplicación:', err),
);
