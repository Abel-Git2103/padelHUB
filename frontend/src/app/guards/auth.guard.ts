import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { ServicioAutenticacion } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAutenticacion implements CanActivate {

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('🛡️ AuthGuard: Verificando autenticación');
    
    // Usar observable para evitar problemas de sincronización
    return this.servicioAuth.usuarioActual$.pipe(
      take(1), // Solo tomar el primer valor para evitar bucles
      map(usuario => {
        const estaAutenticado = usuario !== null;
        console.log('🛡️ AuthGuard: Estado de autenticación:', estaAutenticado);
        
        if (estaAutenticado) {
          console.log('✅ AuthGuard: Usuario autenticado, permitiendo acceso');
          return true;
        } else {
          console.log('❌ AuthGuard: Usuario no autenticado, redirigiendo a login');
          // Usar UrlTree en lugar de navigate para evitar bucles
          return this.enrutador.createUrlTree(['/iniciar-sesion']);
        }
      })
    );
  }
}
