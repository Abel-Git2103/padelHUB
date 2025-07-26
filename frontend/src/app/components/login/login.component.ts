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

  constructor(
    private fb: FormBuilder,
    private servicioAuth: ServicioAutenticacion,
    private enrutador: Router
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]]
    });
  }

  iniciarSesion() {
    if (this.formularioLogin.valid) {
      this.cargando.set(true);
      this.error.set('');

      const credenciales: SolicitudLogin = this.formularioLogin.value;

      this.servicioAuth.iniciarSesion(credenciales).subscribe({
        next: (respuesta) => {
          console.log('Inicio de sesión exitoso', respuesta);
          this.enrutador.navigate(['/tablero']);
        },
        error: (err) => {
          console.error('Error en inicio de sesión', err);
          this.error.set('Credenciales incorrectas. Por favor, intenta de nuevo.');
          this.cargando.set(false);
        },
        complete: () => {
          this.cargando.set(false);
        }
      });
    }
  }

  irARegistro() {
    this.enrutador.navigate(['/registrarse']);
  }
}
