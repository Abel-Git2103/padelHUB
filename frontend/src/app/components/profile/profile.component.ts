import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { Usuario } from '../../models/user.model';
import { obtenerInfoRango, RANGOS_INFO, RangoMetal } from '../../models/rango.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ComponentePerfil implements OnInit {
  usuario = signal<Usuario | null>(null);
  pestanaActiva = signal<'informacion' | 'estadisticas' | 'configuracion'>('informacion');
  modoEdicion = signal(false);
  guardando = signal(false);
  
  formularioPerfil: FormGroup;
  configuracion = {
    notificacionesEmail: true,
    perfilPublico: true,
    mostrarEstadisticas: true
  };

  constructor(
    private fb: FormBuilder,
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {
    this.formularioPerfil = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      ciudad: ['']
    });
  }

  ngOnInit() {
    // Obtener usuario actual del signal
    const usuarioActual = this.servicioAuth.usuarioActual();
    this.usuario.set(usuarioActual);
    
    // Inicializar formulario con datos del usuario
    if (usuarioActual) {
      this.formularioPerfil.patchValue({
        nombre: usuarioActual.nombre,
        apellido: usuarioActual.apellidos || '',
        email: usuarioActual.email,
        ciudad: '' // Campo no disponible en la nueva interfaz
      });
    }

    // Suscribirse a cambios del usuario
    this.servicioAuth.usuarioActual$.subscribe(usuario => {
      this.usuario.set(usuario);
      if (usuario) {
        this.formularioPerfil.patchValue({
          nombre: usuario.nombre,
          apellido: usuario.apellidos || '',
          email: usuario.email,
          ciudad: '' // Campo no disponible en la nueva interfaz
        });
      }
    });
  }

  cambiarPestana(pestana: 'informacion' | 'estadisticas' | 'configuracion') {
    this.pestanaActiva.set(pestana);
    this.modoEdicion.set(false);
  }

  toggleModoEdicion() {
    this.modoEdicion.set(!this.modoEdicion());
    if (this.modoEdicion()) {
      // Reinicializar formulario con datos actuales
      const usuario = this.usuario();
      if (usuario) {
        this.formularioPerfil.patchValue({
          nombre: usuario.nombre,
          apellido: usuario.apellidos || '',
          email: usuario.email,
          ciudad: '' // Campo no disponible en la nueva interfaz
        });
      }
    }
  }

  obtenerInfoRango = obtenerInfoRango;

  obtenerIniciales(): string {
    const usuario = this.usuario();
    if (!usuario) return 'U';
    
    const apellido = usuario.apellidos || usuario.nombre.split(' ')[1] || '';
    return `${usuario.nombre.charAt(0)}${apellido.charAt(0) || usuario.nombre.charAt(1)}`.toUpperCase();
  }

  calcularPorcentajeVictoria(): number {
    const usuario = this.usuario();
    if (!usuario) {
      return 0;
    }
    
    // TODO: Implementar estadísticas reales cuando estén disponibles
    return 0;
  }

  obtenerListaRangos() {
    return [
      { id: 'COBRE' as RangoMetal, ...RANGOS_INFO.COBRE },
      { id: 'BRONCE' as RangoMetal, ...RANGOS_INFO.BRONCE },
      { id: 'PLATA' as RangoMetal, ...RANGOS_INFO.PLATA },
      { id: 'ORO' as RangoMetal, ...RANGOS_INFO.ORO },
      { id: 'PLATINO' as RangoMetal, ...RANGOS_INFO.PLATINO }
    ];
  }

  esRangoCompletado(rango: RangoMetal): boolean {
    const usuario = this.usuario();
    if (!usuario) return false;
    
    const rangoActual = usuario.rangoActual;
    const rangosOrden = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const indiceRangoActual = rangosOrden.indexOf(rangoActual);
    const indiceRangoComparar = rangosOrden.indexOf(rango);
    
    return indiceRangoComparar < indiceRangoActual;
  }

  async guardarCambios() {
    if (this.formularioPerfil.valid) {
      this.guardando.set(true);
      
      try {
        // Aquí iría la llamada al backend para actualizar el perfil
        // Por ahora simulamos una actualización exitosa
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Actualizar el usuario local con los nuevos datos
        const usuario = this.usuario();
        if (usuario) {
          const usuarioActualizado = {
            ...usuario,
            ...this.formularioPerfil.value
          };
          
          // Aquí normalmente actualizarías el usuario en el servicio
        }
        
        this.modoEdicion.set(false);
        
      } catch (error) {
        console.error('Error al actualizar perfil:', error);
      } finally {
        this.guardando.set(false);
      }
    }
  }

  cancelarEdicion() {
    this.modoEdicion.set(false);
    
    // Restaurar valores originales
    const usuario = this.usuario();
    if (usuario) {
      this.formularioPerfil.patchValue({
        nombre: usuario.nombre,
        apellido: usuario.apellidos || '',
        email: usuario.email,
        ciudad: '' // Campo no disponible en la nueva interfaz
      });
    }
  }

  cambiarPassword() {
    // Aquí implementarías la lógica para cambiar contraseña
    alert('Funcionalidad de cambio de contraseña próximamente');
  }

  eliminarCuenta() {
    // Aquí implementarías la lógica para eliminar cuenta
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmacion) {
      alert('Funcionalidad de eliminación de cuenta próximamente');
    }
  }

  navegarA(ruta: string) {
    this.enrutador.navigate([ruta]);
  }

  cerrarSesion() {
    this.servicioAuth.cerrarSesion();
  }
}
