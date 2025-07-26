import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { SolicitudLogin } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class ComponenteLogin {
  formularioLogin: FormGroup;
  cargando = signal(false);
  error = signal('');
  mostrarContrasena = signal(false);

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

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      this.cargando.set(true);
      this.error.set('');

      // Extraer solo los campos que necesita el backend
      const credenciales: SolicitudLogin = {
        email: this.formularioLogin.value.email,
        password: this.formularioLogin.value.password
      };

      this.servicioAuth.iniciarSesion(credenciales).subscribe({
        next: (respuesta) => {
          this.enrutador.navigate(['/tablero']);
        },
        error: (err) => {
          this.error.set('Credenciales incorrectas. Por favor, intenta de nuevo.');
          this.cargando.set(false);
        },
        complete: () => {
          this.cargando.set(false);
        }
      });
    } else {
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
