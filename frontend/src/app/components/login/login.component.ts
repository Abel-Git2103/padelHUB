import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { SolicitudLogin } from '../../models/user.model';
import { Subscription } from 'rxjs';

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

      // Extraer solo los campos que necesita el backend
      const credenciales: SolicitudLogin = {
        email: this.formularioLogin.value.email,
        password: this.formularioLogin.value.password
      };

      this.subscription = this.servicioAuth.iniciarSesion(credenciales).subscribe({
        next: (respuesta) => {
          console.log('✅ Login exitoso para:', respuesta.user.email);
          this.cargando.set(false);
          
          // Redirigir usando Angular Router de forma natural
          // Los guards se encargarán de validar y redirigir al lugar correcto
          const rutaDestino = respuesta.user.rol === 'admin' ? '/admin' : '/jugador';
          
          console.log('🔄 Navegando a:', rutaDestino);
          this.enrutador.navigate([rutaDestino]).then((navegacionExitosa) => {
            if (navegacionExitosa) {
              console.log('✅ Navegación exitosa');
            } else {
              console.log('❌ Error en navegación - posiblemente bloqueada por guards');
            }
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
