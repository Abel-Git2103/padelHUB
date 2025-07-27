import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { ServicioAutenticacion } from '../services/auth.service';
import { ROLES } from '../models/roles.constants';

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

        // 3. El rol ya viene correcto del backend, solo verificar
        const rolUsuario = usuario.rol;
        
        console.log('🔍 RoleGuard - Debug:', {
          rolUsuario: rolUsuario,
          rolesRequeridos: rolesRequeridos,
          usuario: usuario.email
        });
        
        // 4. Verificar si el usuario tiene el rol requerido
        const tieneRol = rolesRequeridos.some(rol => {
          const coincide = rol === rolUsuario;
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
          console.log('❌ RoleGuard: Rol insuficiente');
          console.log(`   Usuario con rol '${rolUsuario}' intentó acceder a ruta que requiere: ${rolesRequeridos.join(', ')}`);
          
          // Redirección inteligente en lugar de "no autorizado"
          return this.redirigirSegunRol(usuario, route);
        }
      })
    );
  }

  private redirigirSegunRol(usuario: any, route: ActivatedRouteSnapshot): UrlTree {
    const rutaActual = route.routeConfig?.path || '';
    const rutaCompleta = this.construirRutaCompleta(route);
    
    console.log('🔄 Redirección inteligente:', {
      rutaActual,
      rutaCompleta,
      rolUsuario: usuario.rol
    });

    // Si es admin intentando acceder a otra sección de admin
    if (rutaCompleta.includes('/admin/')) {
      if (usuario.rol === ROLES.ADMIN_SISTEMA) {
        console.log('   → Redirigiendo Admin Sistema a su dashboard');
        return this.enrutador.createUrlTree(['/admin/system/dashboard']);
      } else if (usuario.rol === ROLES.ADMIN_CLUB) {
        console.log('   → Redirigiendo Admin Club a su dashboard');
        return this.enrutador.createUrlTree(['/admin/club/dashboard']);
      }
    }

    // Si es jugador intentando acceder a admin
    if (rutaCompleta.includes('/admin/') && usuario.rol === ROLES.JUGADOR) {
      console.log('   → Jugador intentando acceder a admin - No autorizado');
      return this.enrutador.createUrlTree(['/no-autorizado']);
    }

    // Si es admin intentando acceder a jugador
    if (rutaCompleta.includes('/jugador/') && (usuario.rol === ROLES.ADMIN_SISTEMA || usuario.rol === ROLES.ADMIN_CLUB)) {
      console.log('   → Admin intentando acceder a jugador - Redirigiendo a admin');
      return this.enrutador.createUrlTree(['/admin']);
    }

    // Redirección por defecto según rol
    console.log('   → Redirección por defecto');
    if (usuario.rol === ROLES.ADMIN_SISTEMA) {
      return this.enrutador.createUrlTree(['/admin/system/dashboard']);
    } else if (usuario.rol === ROLES.ADMIN_CLUB) {
      return this.enrutador.createUrlTree(['/admin/club/dashboard']);
    } else if (usuario.rol === ROLES.JUGADOR) {
      return this.enrutador.createUrlTree(['/jugador/tablero']);
    } else {
      return this.enrutador.createUrlTree(['/iniciar-sesion']);
    }
  }

  private construirRutaCompleta(route: ActivatedRouteSnapshot): string {
    const segments: string[] = [];
    let currentRoute = route;
    
    // Construir la ruta completa navegando hacia arriba
    while (currentRoute) {
      if (currentRoute.routeConfig?.path) {
        segments.unshift(currentRoute.routeConfig.path);
      }
      currentRoute = currentRoute.parent as ActivatedRouteSnapshot;
    }
    
    return '/' + segments.join('/');
  }
}
