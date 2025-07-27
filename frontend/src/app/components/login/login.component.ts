import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { SolicitudLogin } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { ROLES } from '../../models/roles.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class ComponenteLogin implements OnInit, OnDestroy {
  formularioLogin: FormGroup;
  cargando = signal(false);
  error = signal('');
  mostrarContrasena = signal(false);
  private subscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      recordarme: [false]
    });
  }

  ngOnInit() {
    // Solo mostrar información de debug, NO redirigir automáticamente
    console.log('LoginComponent iniciado');
    console.log('¿Está autenticado?', this.servicioAuth.estaAutenticado());
    const usuario = this.servicioAuth.usuarioActual();
    if (usuario) {
      console.log('Usuario actual:', usuario.rol);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  iniciarSesion() {
    if (this.formularioLogin.valid && !this.cargando()) {
      this.cargando.set(true);
      this.error.set('');

      // Extraer todos los campos incluyendo recordarme
      const credenciales = {
        email: this.formularioLogin.value.email,
        password: this.formularioLogin.value.password,
        recordarme: this.formularioLogin.value.recordarme
      };

      console.log('📝 Credenciales de login:', {
        email: credenciales.email,
        recordarme: credenciales.recordarme
      });

      this.subscription = this.servicioAuth.iniciarSesion(credenciales, false).subscribe({
        next: (respuesta) => {
          console.log('🔑 LOGIN EXITOSO - ANÁLISIS COMPLETO:');
          console.log('   📧 Usuario:', respuesta.user.email);
          console.log('   👤 Rol:', respuesta.user.rol);
          console.log('   🎯 Ruta actual antes de navegar:', this.enrutador.url);
          
          this.cargando.set(false);
          
          // Determinar destino según rol - usar /admin para admins
          let rutaDestino = '';
          if (respuesta.user.rol === ROLES.ADMIN_SISTEMA || respuesta.user.rol === ROLES.ADMIN_CLUB) {
            rutaDestino = '/admin';
            console.log('   🎯 Destino: /admin (AdminRedirectGuard se encargará del resto)');
          } else {
            rutaDestino = '/jugador/tablero';
            console.log('   🎯 Destino: Dashboard Jugador');
          }
          
          console.log('🔄 NAVEGANDO A:', rutaDestino);
          
          // Navegar directamente al destino final
          this.enrutador.navigate([rutaDestino], { replaceUrl: true }).then((navegacionExitosa) => {
            if (navegacionExitosa) {
              console.log('✅ NAVEGACIÓN COMPLETADA - Sin redirecciones adicionales');
            } else {
              console.log('❌ ERROR EN NAVEGACIÓN - verificar guards o rutas');
            }
          }).catch(error => {
            console.error('💥 ERROR EN NAVEGACIÓN:', error);
          });
        },
        error: (err) => {
          console.error('Error en login:', err);
          this.error.set('Credenciales incorrectas. Por favor, intenta de nuevo.');
          this.cargando.set(false);
        },
        complete: () => {
          console.log('Observable de login completado');
        }
      });
    } else if (!this.formularioLogin.valid) {
      // Formulario inválido
      this.error.set('Por favor, complete todos los campos correctamente.');
    }
  }

  irARegistro() {
    this.enrutador.navigate(['/registrarse']);
  }

  alternarMostrarContrasena() {
    this.mostrarContrasena.set(!this.mostrarContrasena());
  }

  iniciarSesionConGoogle() {
    // TODO: Implementar autenticación con Google
  }

  iniciarSesionConApple() {
    // TODO: Implementar autenticación con Apple
  }

  irAOlvidoContrasena() {
    // TODO: Navegar a la página de recuperación de contraseña
  }
}
