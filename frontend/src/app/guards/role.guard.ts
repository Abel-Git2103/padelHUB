import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { ServicioAutenticacion } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardRol implements CanActivate {

  constructor(
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('🛡️ RoleGuard: Verificando acceso para ruta:', route.routeConfig?.path);
    
    // Usar observable para evitar problemas de sincronización
    return this.servicioAuth.usuarioActual$.pipe(
      take(1), // Solo tomar el primer valor para evitar bucles
      map(usuario => {
        // 1. Verificar autenticación (el AuthGuard ya debería haberlo verificado)
        if (!usuario) {
          console.log('❌ RoleGuard: No hay usuario autenticado');
          return this.enrutador.createUrlTree(['/iniciar-sesion']);
        }

        // 2. Verificar roles requeridos
        const rolesRequeridos = route.data['roles'] as Array<string>;
        if (!rolesRequeridos || rolesRequeridos.length === 0) {
          console.log('✅ RoleGuard: No hay roles requeridos, acceso permitido');
          return true;
        }

        // 3. Normalizar el rol del usuario - solo convertir 'user' a 'jugador'
        const rolUsuario = usuario.rol === 'user' ? 'jugador' : usuario.rol;
        
        console.log('🔍 RoleGuard - Debug:', {
          rolOriginal: usuario.rol,
          rolNormalizado: rolUsuario,
          rolesRequeridos: rolesRequeridos,
          usuario: usuario.email
        });
        
        // 4. Verificar si el usuario tiene el rol requerido
        const tieneRol = rolesRequeridos.some(rol => {
          const coincide = rol === rolUsuario || 
                          (rol === 'jugador' && usuario.rol === 'user') ||
                          (rol === 'user' && usuario.rol === 'user');
          
          console.log(`🔍 Verificando rol '${rol}' vs '${rolUsuario}': ${coincide}`);
          return coincide;
        });
        
        console.log('🔍 RoleGuard - Resultado:', {
          usuario: usuario.email,
          rolUsuario: rolUsuario,
          rolesRequeridos: rolesRequeridos,
          tieneRol: tieneRol,
          rutaActual: route.routeConfig?.path
        });
        
        if (tieneRol) {
          console.log('✅ RoleGuard: Acceso permitido');
          return true;
        } else {
          console.log('❌ RoleGuard: Rol insuficiente - redirigiendo a ruta correcta');
          
          // Evitar redirección circular - verificar si ya estamos en la ruta correcta
          const rutaActual = route.routeConfig?.path;
          
          if (usuario.rol === 'admin') {
            // Si es admin pero no está en ruta admin, redirigir
            if (!rutaActual?.includes('admin')) {
              return this.enrutador.createUrlTree(['/admin/dashboard']);
            }
          } else {
            // Si es jugador pero no está en ruta jugador, redirigir
            if (!rutaActual?.includes('jugador')) {
              return this.enrutador.createUrlTree(['/jugador/tablero']);
            }
          }
          
          // Si ya estamos en la ruta correcta pero el rol no coincide, ir a dashboard por defecto
          return this.enrutador.createUrlTree(['/iniciar-sesion']);
        }
      })
    );
  }
}
