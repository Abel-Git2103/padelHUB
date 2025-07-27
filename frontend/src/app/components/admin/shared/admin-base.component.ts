import { Component, OnInit, OnDestroy, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../../services/auth.service';
import { AdminPermissionsService } from '../../../services/admin-permissions.service';
import { Usuario } from '../../../models/user.model';
import { Subscription } from 'rxjs';

/**
 * Componente base para todos los componentes de administración
 * Proporciona funcionalidades comunes y estado compartido
 */
@Component({
  template: '' // Componente abstracto sin template
})
export abstract class AdminBaseComponent implements OnInit, OnDestroy {
  
  // Servicios inyectados
  protected enrutador = inject(Router);
  protected servicioAuth = inject(ServicioAutenticacion);
  protected adminPermissions = inject(AdminPermissionsService);
  
  // Estado del usuario
  protected usuario = signal<Usuario | null>(null);
  protected subscripcionUsuario?: Subscription;
  
  // Computados para tipos de admin - delegando al AuthService
  protected esAdminClub = computed(() => this.servicioAuth.esAdminClub());
  protected esAdminSistema = computed(() => this.servicioAuth.esAdminSistema());
  protected esAdmin = computed(() => this.servicioAuth.esAdmin());

  // ========== MÉTODOS DE VALIDACIÓN CON DOBLE VERIFICACIÓN ==========
  
  /**
   * Verifica si puede gestionar un club específico (con doble validación)
   */
  protected puedeGestionarClub(clubId?: string): boolean {
    return this.adminPermissions.puedeGestionarClub(clubId);
  }

  /**
   * Verifica si puede gestionar usuarios de un club específico
   */
  protected puedeGestionarUsuariosClub(clubId?: string): boolean {
    return this.adminPermissions.puedeGestionarUsuariosClub(clubId);
  }

  /**
   * Obtiene el ID del club del usuario actual (solo para admins de club)
   */
  protected obtenerIdClubActual(): string | undefined {
    return this.usuario()?.idClub;
  }
  
  // Estado de carga
  protected cargando = signal(false);
  protected error = signal<string | null>(null);

  ngOnInit(): void {
    this.inicializarUsuario();
    this.onInit();
  }

  ngOnDestroy(): void {
    this.subscripcionUsuario?.unsubscribe();
    this.onDestroy();
  }

  /**
   * Métodos que deben implementar las clases derivadas
   */
  protected abstract onInit(): void;
  protected abstract onDestroy(): void;

  /**
   * Inicializar estado del usuario
   */
  private inicializarUsuario(): void {
    this.subscripcionUsuario = this.servicioAuth.usuarioActual$.subscribe(
      usuario => {
        this.usuario.set(usuario);
        if (usuario && !this.esAdmin()) {
          this.enrutador.navigate(['/jugador/tablero']);
        }
      }
    );
  }

  /**
   * Navegación común
   */
  protected navegarA(ruta: string): void {
    this.enrutador.navigate([ruta]);
  }

  /**
   * Obtener iniciales del usuario
   */
  protected obtenerIniciales(): string {
    const usuario = this.usuario();
    if (!usuario) return 'A';
    
    const apellido = usuario.apellidos || usuario.nombre.split(' ')[1] || '';
    return `${usuario.nombre.charAt(0)}${apellido.charAt(0) || usuario.nombre.charAt(1)}`.toUpperCase();
  }

  /**
   * Manejo de errores común
   */
  protected manejarError(error: any, mensaje: string = 'Ha ocurrido un error'): void {
    console.error('Error en componente admin:', error);
    this.error.set(mensaje);
    this.cargando.set(false);
  }

  /**
   * Limpiar estado de error
   */
  protected limpiarError(): void {
    this.error.set(null);
  }

  /**
   * Establecer estado de carga
   */
  protected establecerCarga(estado: boolean): void {
    this.cargando.set(estado);
    if (estado) {
      this.limpiarError();
    }
  }
}
