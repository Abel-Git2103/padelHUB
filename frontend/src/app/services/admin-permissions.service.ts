import { Injectable, inject } from '@angular/core';
import { ServicioAutenticacion } from './auth.service';
import { Usuario } from '../models/user.model';

/**
 * Servicio para manejar permisos específicos de administradores
 * 
 * Este servicio se enfoca en la lógica de PERMISOS y validaciones específicas,
 * mientras que los métodos básicos de roles (esAdmin, esAdminClub, etc.) 
 * están en ServicioAutenticacion para evitar duplicación.
 * 
 * Responsabilidades:
 * - Validaciones de permisos específicos (puedeGestionarClub, puedeCrearClubes, etc.)
 * - Lógica de negocio para autorización de acciones
 * - Gestión de rutas permitidas por rol
 */
@Injectable({
  providedIn: 'root'
})
export class AdminPermissionsService {
  
  private servicioAuth = inject(ServicioAutenticacion);

  /**
   * Obtener usuario actual
   */
  private getUsuarioActual(): Usuario | null {
    return this.servicioAuth.usuarioActual();
  }

  /**
   * Verificar si el usuario tiene un rol específico
   */
  tieneRol(rol: string): boolean {
    const usuario = this.getUsuarioActual();
    return usuario?.rol === rol;
  }

  // ========== PERMISOS ESPECÍFICOS ==========

  /**
   * Puede gestionar todos los clubes del sistema
   */
  puedeGestionarTodosLosClubes(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede cambiar el estado de un club (activar/desactivar/suspender)
   */
  puedeCambiarEstadoClub(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede gestionar un club específico
   */
  puedeGestionarClub(clubId?: string): boolean {
    const usuario = this.getUsuarioActual();
    
    if (this.servicioAuth.esAdminSistema()) {
      return true; // Admin sistema puede gestionar cualquier club
    }
    
    if (this.servicioAuth.esAdminClub()) {
      // Admin club solo puede gestionar su propio club
      return !clubId || usuario?.idClub === clubId;
    }
    
    return false;
  }

  /**
   * Puede crear nuevos clubes
   */
  puedeCrearClubes(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede eliminar clubes
   */
  puedeEliminarClubes(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede gestionar usuarios globalmente
   */
  puedeGestionarTodosLosUsuarios(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede gestionar usuarios de un club específico
   */
  puedeGestionarUsuariosClub(clubId?: string): boolean {
    const usuario = this.getUsuarioActual();
    
    if (this.servicioAuth.esAdminSistema()) {
      return true;
    }
    
    if (this.servicioAuth.esAdminClub()) {
      return !clubId || usuario?.idClub === clubId;
    }
    
    return false;
  }

  /**
   * Puede ver rankings globales
   */
  puedeVerRankingsGlobales(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede gestionar rankings de club
   */
  puedeGestionarRankingsClub(clubId?: string): boolean {
    return this.puedeGestionarClub(clubId);
  }

  /**
   * Puede crear torneos interclubes
   */
  puedeCrearTorneosInterclubes(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede crear torneos internos del club
   */
  puedeCrearTorneosInternos(clubId?: string): boolean {
    return this.puedeGestionarClub(clubId);
  }

  /**
   * Puede acceder a configuración del sistema
   */
  puedeAccederConfiguracionSistema(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede acceder a configuración del club
   */
  puedeAccederConfiguracionClub(clubId?: string): boolean {
    return this.puedeGestionarClub(clubId);
  }

  /**
   * Puede ver estadísticas globales de la plataforma
   */
  puedeVerEstadisticasGlobales(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede ver estadísticas del club
   */
  puedeVerEstadisticasClub(clubId?: string): boolean {
    return this.puedeGestionarClub(clubId);
  }

  /**
   * Puede gestionar suscripciones y pagos
   */
  puedeGestionarSuscripciones(): boolean {
    return this.servicioAuth.esAdminSistema();
  }

  /**
   * Puede agregar/remover administradores de club
   */
  puedeGestionarAdministradores(clubId?: string): boolean {
    if (this.servicioAuth.esAdminSistema()) {
      return true;
    }
    
    // Admin de club puede gestionar otros admins de su mismo club
    return this.servicioAuth.esAdminClub() && this.puedeGestionarClub(clubId);
  }

  /**
   * Obtener rutas permitidas según el rol
   */
  getRutasPermitidas(): string[] {
    const usuario = this.getUsuarioActual();
    
    if (!usuario || !this.servicioAuth.esAdmin()) {
      return [];
    }

    const rutasComunes = [
      '/admin/dashboard'
    ];

    if (this.servicioAuth.esAdminSistema()) {
      return [
        ...rutasComunes,
        '/admin/system/dashboard',
        '/admin/system/clubs',
        '/admin/system/users',
        '/admin/system/analytics',
        '/admin/system/settings',
        '/admin/system/rankings',
        '/admin/system/tournaments'
      ];
    }

    if (this.servicioAuth.esAdminClub()) {
      return [
        ...rutasComunes,
        '/admin/club/dashboard',
        '/admin/club/management',
        '/admin/club/members',
        '/admin/club/tournaments',
        '/admin/club/rankings',
        '/admin/club/settings'
      ];
    }

    return rutasComunes;
  }

  /**
   * Verificar si puede acceder a una ruta específica
   */
  puedeAccederRuta(ruta: string): boolean {
    return this.getRutasPermitidas().includes(ruta);
  }
}
