import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioAutenticacion } from '../services/auth.service';
import { ROLES } from '../models/roles.constants';

@Injectable({
  providedIn: 'root'
})
export class SmartRedirectGuard implements CanActivate {

  constructor(
    private authService: ServicioAutenticacion,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario = this.authService.usuarioActual();
    
    if (!usuario) {
      console.log('❌ SmartRedirectGuard: No hay usuario autenticado');
      return this.router.createUrlTree(['/iniciar-sesion']);
    }

    const rutaCompleta = route.url.map(segment => segment.path).join('/');
    const rutaPadre = route.parent?.url.map(segment => segment.path).join('/');
    
    console.log('🧭 SmartRedirectGuard:', {
      usuario: usuario.email,
      rol: usuario.rol,
      rutaCompleta,
      rutaPadre,
      fullPath: `/${rutaPadre}/${rutaCompleta}`.replace('//', '/')
    });

    // Si es una ruta incompleta o genérica, redirigir al dashboard correcto
    if (rutaCompleta === '' || rutaCompleta === 'admin' || rutaCompleta === 'jugador') {
      console.log('🔄 Ruta incompleta detectada, redirigiendo a dashboard específico');
      
      if (usuario.rol === ROLES.ADMIN_SISTEMA) {
        return this.router.createUrlTree(['/admin/system/dashboard']);
      } else if (usuario.rol === ROLES.ADMIN_CLUB) {
        return this.router.createUrlTree(['/admin/club/dashboard']);
      } else if (usuario.rol === ROLES.JUGADOR) {
        return this.router.createUrlTree(['/jugador/tablero']);
      }
    }

    // Si la ruta es específica pero el usuario no tiene permisos
    if (rutaPadre === 'admin') {
      if (rutaCompleta.startsWith('system') && usuario.rol !== ROLES.ADMIN_SISTEMA) {
        console.log('❌ Admin Club intentando acceder a rutas de Admin Sistema');
        return this.router.createUrlTree(['/admin/club/dashboard']);
      }
      
      if (rutaCompleta.startsWith('club') && usuario.rol !== ROLES.ADMIN_CLUB) {
        console.log('❌ Admin Sistema intentando acceder a rutas de Admin Club');
        return this.router.createUrlTree(['/admin/system/dashboard']);
      }
    }

    // Si un jugador intenta acceder a rutas de admin
    if (rutaPadre === 'admin' && usuario.rol === ROLES.JUGADOR) {
      console.log('❌ Jugador intentando acceder a rutas de admin');
      return this.router.createUrlTree(['/no-autorizado']);
    }

    // Si un admin intenta acceder a rutas de jugador
    if (rutaPadre === 'jugador' && (usuario.rol === ROLES.ADMIN_SISTEMA || usuario.rol === ROLES.ADMIN_CLUB)) {
      console.log('❌ Admin intentando acceder a rutas de jugador');
      return this.router.createUrlTree(['/admin']);
    }

    return true;
  }
}
