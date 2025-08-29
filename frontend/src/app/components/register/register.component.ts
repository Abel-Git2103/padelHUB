import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicioAutenticacion } from '../../services/auth.service';
import { ServicioClubes } from '../../services/clubes.service';
import { Club } from '../../models/club.model';
import { RANGOS_INFO } from '../../models/rango.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class ComponenteRegistro implements OnInit {
  formularioRegistro: FormGroup;
  cargando = signal(false);
  error = signal('');
  clubes = signal<Club[]>([]);
  rangosDisponibles = Object.values(RANGOS_INFO);

  constructor(
    private fb: FormBuilder,
    private servicioAuth: ServicioAutenticacion,
    private servicioClube: ServicioClubes,
    private enrutador: Router
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', [Validators.required]],
      telefono: [''],
      rangoActual: ['COBRE', [Validators.required]]
    }, {
      validators: this.validadorContrasenas
    });
  }

  ngOnInit() {
    // Cargar clubes disponibles
    this.servicioClube.obtenerTodosClubes().subscribe({
      next: (clubes: Club[]) => this.clubes.set(clubes),
      error: (error: any) => console.error('Error al cargar clubes:', error)
    });
  }

  private validadorContrasenas(grupo: FormGroup) {
    const password = grupo.get('password')?.value;
    const confirmarPassword = grupo.get('confirmarPassword')?.value;
    
    if (password !== confirmarPassword) {
      grupo.get('confirmarPassword')?.setErrors({ noCoinciden: true });
    } else {
      grupo.get('confirmarPassword')?.setErrors(null);
    }
    
    return null;
  }

  async registrarse() {
    if (this.formularioRegistro.valid) {
      this.cargando.set(true);
      this.error.set('');

      try {
        const datosRegistro = {
          nombre: this.formularioRegistro.value.nombre,
          apellidos: this.formularioRegistro.value.apellidos,
          email: this.formularioRegistro.value.email,
          password: this.formularioRegistro.value.password,
          telefono: this.formularioRegistro.value.telefono,
          rangoActual: this.formularioRegistro.value.rangoActual
        };

  // toPromise() está deprecado; usar firstValueFrom
  await firstValueFrom(this.servicioAuth.registrarse(datosRegistro));
        this.enrutador.navigate(['/tablero']);
      } catch (error) {
        console.error('Error en registro:', error);
        this.error.set('Error al registrarse. Por favor, inténtalo de nuevo.');
      } finally {
        this.cargando.set(false);
      }
    }
  }

  irALogin() {
    this.enrutador.navigate(['/iniciar-sesion']);
  }
}
