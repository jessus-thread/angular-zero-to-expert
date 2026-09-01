import { Routes } from '@angular/router';
import { CounterPage } from './pages/counter/counter-page';
import { HeroPage } from './pages/hero/hero-page';
import { DragonballPage } from './pages/dragonball/dragonball-page';

/**
 * ARCHIVO: app.routes.ts
 *
 * Definición global de rutas para la Single Page Application (SPA).
 * Este arreglo configura cómo la URL del navegador se mapea a los diferentes componentes.
 * Aquí se definen rutas estáticas, rutas con parámetros, redirecciones, protecciones (Guards)
 * y la carga diferida de módulos/componentes (Lazy Loading).
 */
export const routes: Routes = [
  // Ejemplo de estructura base (vacía por ahora)
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/404' } // Wildcard para rutas no encontradas
  { path: '', component: CounterPage },
  { path: 'hero', component: HeroPage },
  { path: 'dragonball', component: DragonballPage },
  /*
    WILDCARD ROUTE (Comodín)
    Atrapa cualquier URL que no haya hecho match con las rutas anteriores.
    Actúa como un "Fallback" para redirigir a una ruta segura (ej. Inicio o 404).
    ⚠️ IMPORTANTE: Siempre debe ser el ÚLTIMO elemento en el arreglo de rutas,
    ya que el Router evalúa en cascada (de arriba hacia abajo).
  */
  { path: '**', redirectTo: '' },
];
