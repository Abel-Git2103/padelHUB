import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicioAutenticacion } from '../services/auth.service';
import { ROLES } from '../models/roles.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminRedirectGuard implements CanActivate {

  constructor(
    private authService: ServicioAutenticacion,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const usuario = this.authService.usuarioActual();
    
    console.log('🛡️ AdminRedirectGuard: Redirigiendo según rol:', usuario?.rol);
    
    if (!usuario) {
      console.log('❌ No hay usuario, redirigiendo a login');
      return this.router.createUrlTree(['/iniciar-sesion']);
    }

    // Redirección condicional según el rol
    if (usuario.rol === ROLES.ADMIN_SISTEMA) {
      console.log('   → Admin Sistema: /admin/system/dashboard');
      return this.router.createUrlTree(['/admin/system/dashboard']);
    } else if (usuario.rol === ROLES.ADMIN_CLUB) {
      console.log('   → Admin Club: /admin/club/dashboard');
      return this.router.createUrlTree(['/admin/club/dashboard']);
    } else {
      console.log('   → Rol no admin, redirigiendo a jugador');
      return this.router.createUrlTree(['/jugador/tablero']);
    }
  }
}
