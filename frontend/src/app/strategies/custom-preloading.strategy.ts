import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Solo precargar rutas críticas para mejorar UX
    const criticalRoutes = [
      'tablero',      // Dashboard - alta probabilidad de navegación
      'clubes',       // Clubs listing - funcionalidad principal
      'perfil'        // Profile - acceso frecuente
    ];
    
    const routePath = route.path || '';
    
    // Precargar si es una ruta crítica
    if (criticalRoutes.some(critical => routePath.includes(critical))) {
      console.log(`🚀 Preloading critical route: ${routePath}`);
      return load();
    }
    
    // No precargar rutas administrativas o menos frecuentes
    const heavyRoutes = [
      'admin',
      'configuracion',
      'ayuda',
      'rankings'
    ];
    
    if (heavyRoutes.some(heavy => routePath.includes(heavy))) {
      console.log(`⏸️ Skipping preload for heavy route: ${routePath}`);
      return of(null);
    }
    
    // Precargar el resto con delay para no bloquear
    console.log(`⏳ Delayed preload for route: ${routePath}`);
    return new Observable(observer => {
      setTimeout(() => {
        load().subscribe(observer);
      }, 2000); // 2 segundos de delay
    });
  }
}
