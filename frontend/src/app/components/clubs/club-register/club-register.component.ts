import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ServicioClubes } from '../../../services/clubes.service';
import { ServicioAutenticacion } from '../../../services/auth.service';
import { BaseComponent } from '../../../shared/base-component';

interface ClubContactForm {
  email: string;
  phone: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

interface ClubLocationForm {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  coordinates?: [number, number];
}

interface ClubPricingForm {
  courtPricePerHour: number;
  memberDiscount?: number;
  // ELIMINADO: allowNonMembers - funcionalidad siempre habilitada
}

@Component({
  selector: 'app-club-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="club-register-container">
      <div class="register-header">
        <button class="back-button" (click)="volver()">
          ← Volver a Clubes
        </button>
        <h1>Registrar Nuevo Club</h1>
        <p class="subtitle">Crea tu club de pádel y únete a la comunidad</p>
      </div>

      <form [formGroup]="clubForm" (ngSubmit)="onSubmit()" class="club-form">
        <!-- Información Básica -->
        <div class="form-section">
          <h2>📋 Información Básica</h2>
          
          <div class="form-group">
            <label for="name">Nombre del Club *</label>
            <input
              id="name"
              type="text"
              formControlName="name"
              placeholder="Ej: Club Deportivo Padel Pro"
              [class.error]="isFieldInvalid('name')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('name')">
              El nombre del club es obligatorio
            </div>
          </div>

          <div class="form-group">
            <label for="description">Descripción *</label>
            <textarea
              id="description"
              formControlName="description"
              placeholder="Describe tu club, instalaciones, filosofía..."
              rows="4"
              [class.error]="isFieldInvalid('description')"
            ></textarea>
            <div class="error-message" *ngIf="isFieldInvalid('description')">
              La descripción del club es obligatoria
            </div>
          </div>

          <div class="form-group">
            <label for="logo">URL del Logo</label>
            <input
              id="logo"
              type="url"
              formControlName="logo"
              placeholder="https://ejemplo.com/logo.jpg"
            />
          </div>

          <div class="form-group">
            <label for="totalCourts">Número de Pistas *</label>
            <input
              id="totalCourts"
              type="number"
              formControlName="totalCourts"
              min="1"
              placeholder="6"
              [class.error]="isFieldInvalid('totalCourts')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('totalCourts')">
              Debe tener al menos 1 pista
            </div>
          </div>
        </div>

        <!-- Información de Contacto -->
        <div class="form-section" formGroupName="contact">
          <h2>📞 Información de Contacto</h2>
          
          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="contacto@clubpadel.com"
              [class.error]="isFieldInvalid('contact.email')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('contact.email')">
              Email válido es obligatorio
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Teléfono *</label>
            <input
              id="phone"
              type="tel"
              formControlName="phone"
              placeholder="+34 666 777 888"
              [class.error]="isFieldInvalid('contact.phone')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('contact.phone')">
              <span *ngIf="clubForm.get('contact.phone')?.errors?.['required']">Teléfono es obligatorio</span>
              <span *ngIf="clubForm.get('contact.phone')?.errors?.['pattern']">Formato de teléfono inválido (ej: +34 666 777 888)</span>
            </div>
          </div>

          <div class="form-group">
            <label for="website">Sitio Web</label>
            <input
              id="website"
              type="url"
              formControlName="website"
              placeholder="https://www.clubpadel.com"
            />
          </div>
        </div>

        <!-- Ubicación -->
        <div class="form-section" formGroupName="location">
          <h2>📍 Ubicación</h2>
          
          <div class="form-group">
            <label for="address">Dirección *</label>
            <input
              id="address"
              type="text"
              formControlName="address"
              placeholder="Calle Principal, 123"
              [class.error]="isFieldInvalid('location.address')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('location.address')">
              La dirección es obligatoria
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">Ciudad *</label>
              <input
                id="city"
                type="text"
                formControlName="city"
                placeholder="Madrid"
                [class.error]="isFieldInvalid('location.city')"
              />
            </div>

            <div class="form-group">
              <label for="province">Provincia *</label>
              <input
                id="province"
                type="text"
                formControlName="province"
                placeholder="Madrid"
                [class.error]="isFieldInvalid('location.province')"
              />
            </div>

            <div class="form-group">
              <label for="postalCode">Código Postal *</label>
              <input
                id="postalCode"
                type="text"
                formControlName="postalCode"
                placeholder="28001"
                [class.error]="isFieldInvalid('location.postalCode')"
              />
            </div>
          </div>
        </div>

        <!-- Precios -->
        <div class="form-section" formGroupName="pricing">
          <h2>💰 Configuración de Precios</h2>
          
          <div class="form-group">
            <label for="courtPricePerHour">Precio por Hora de Pista (€) *</label>
            <input
              id="courtPricePerHour"
              type="number"
              formControlName="courtPricePerHour"
              min="0"
              step="0.5"
              placeholder="25.00"
              [class.error]="isFieldInvalid('pricing.courtPricePerHour')"
            />
            <div class="error-message" *ngIf="isFieldInvalid('pricing.courtPricePerHour')">
              El precio por hora es obligatorio
            </div>
          </div>

          <div class="form-group">
            <label for="memberDiscount">Descuento para Miembros (%)</label>
            <input
              id="memberDiscount"
              type="number"
              formControlName="memberDiscount"
              min="0"
              max="100"
              placeholder="15"
            />
          </div>

          <!-- Nota informativa sobre funcionalidades incluidas -->
          <div class="info-box premium-features">
            <div class="info-icon">💎</div>
            <div class="info-content">
              <h4>Funcionalidades incluidas en tu suscripción</h4>
              <p>Tu club tendrá acceso completo a todas las funcionalidades de PadelHUB:</p>
              <ul class="features-list">
                <li>🏆 Organización de torneos</li>
                <li>👥 Aceptación de jugadores de otros clubes</li>
                <li>📊 Participación en rankings nacionales</li>
                <li>📈 Estadísticas avanzadas</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Configuración Adicional -->
        <div class="form-section">
          <h2>⚙️ Configuración Adicional</h2>
          
          <!-- Información sobre funcionalidades incluidas -->
          <div class="info-box">
            <h3>✅ Funcionalidades Incluidas en tu Suscripción (200€/mes)</h3>
            <ul>
              <li>🏆 <strong>Torneos habilitados</strong> - Organiza torneos internos e interclubes sin comisiones</li>
              <li>👥 <strong>Jugadores externos permitidos</strong> - Acceso completo al ecosistema PadelHUB</li>
              <li>📊 <strong>Rankings nacionales</strong> - Tu club participa en el ranking nacional</li>
              <li>🎯 <strong>Sistema de ascensos</strong> - Tus miembros pueden ascender rápidamente</li>
            </ul>
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                formControlName="requireMembershipApproval"
              />
              <span class="checkmark"></span>
              Requiere aprobación para membresía
            </label>
          </div>
        </div>

        <!-- Botones de Acción -->
        <div class="form-actions">
          <button
            type="button"
            class="btn-secondary"
            (click)="volver()"
            [disabled]="guardando()"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            class="btn-primary"
            [disabled]="clubForm.invalid || guardando()"
          >
            <span *ngIf="guardando()" class="loading-spinner"></span>
            {{ guardando() ? 'Guardando...' : 'Crear Club' }}
          </button>
        </div>
      </form>

      <!-- Mensaje de éxito -->
      <div class="success-message" *ngIf="mostrarMensajeExito()">
        ✅ Club creado exitosamente
      </div>

      <!-- Mensaje de error -->
      <div class="error-message-global" *ngIf="error()">
        ❌ {{ error() }}
      </div>
    </div>
  `,
  styleUrls: ['./club-register.component.scss']
})
export class ClubRegisterComponent extends BaseComponent implements OnInit {
  clubForm!: FormGroup;
  guardando = signal(false);
  mostrarMensajeExito = signal(false);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private servicioClub: ServicioClubes,
    private servicioAuth: ServicioAutenticacion,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.checkUserPermissions();
    this.initializeForm();
  }

  private checkUserPermissions() {
    const currentUser = this.servicioAuth.usuarioActual();
    console.log('Usuario actual:', currentUser);
    
    if (!currentUser) {
      console.error('Usuario no autenticado');
      this.error.set('Debes estar autenticado para crear un club');
      this.router.navigate(['/login']);
      return;
    }

    // Verificar si tiene permisos de admin
    const hasAdminPermissions = currentUser.rol === 'ADMIN_SISTEMA' || 
                               currentUser.rol === 'ADMIN_CLUB';
    
    if (!hasAdminPermissions) {
      console.error('Usuario sin permisos de admin:', currentUser.rol);
      this.error.set('No tienes permisos para crear clubes');
      return;
    }

    console.log('Usuario autorizado para crear clubes');
  }

  private initializeForm() {
    this.clubForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      logo: [''],
      totalCourts: [1, [Validators.required, Validators.min(1)]],
      contact: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{9,}$/)]],
        website: ['']
      }),
      location: this.fb.group({
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        province: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      }),
      pricing: this.fb.group({
        courtPricePerHour: [0, [Validators.required, Validators.min(0)]],
        memberDiscount: [0, [Validators.min(0), Validators.max(100)]]
        // ELIMINADO: allowNonMembers - funcionalidad siempre habilitada
      }),
      // Removidos allowTournaments y allowExternalPlayers
      // Estas funcionalidades están siempre habilitadas
      requireMembershipApproval: [false]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.getFormControl(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  private getFormControl(fieldName: string) {
    const fieldParts = fieldName.split('.');
    let control = this.clubForm;
    
    for (const part of fieldParts) {
      control = control.get(part) as FormGroup;
      if (!control) return null;
    }
    
    return control;
  }

  async onSubmit() {
    if (this.clubForm.invalid) {
      this.markFormGroupTouched(this.clubForm);
      console.log('Formulario inválido:', this.clubForm.errors);
      // Mostrar errores específicos
      Object.keys(this.clubForm.controls).forEach(key => {
        const control = this.clubForm.get(key);
        if (control && control.invalid) {
          console.log(`Campo ${key} inválido:`, control.errors);
        }
      });
      return;
    }

    this.guardando.set(true);
    this.error.set(null);

    try {
      const formData = this.clubForm.value;
      console.log('Datos del formulario:', formData);
      
      // Preparar datos para envío
      const clubData = {
        name: formData.name,
        description: formData.description,
        logo: formData.logo || undefined,
        totalCourts: formData.totalCourts,
        contact: {
          email: formData.contact.email,
          phone: formData.contact.phone,
          website: formData.contact.website || undefined
        },
        location: {
          address: formData.location.address,
          city: formData.location.city,
          province: formData.location.province,
          postalCode: formData.location.postalCode
        },
        pricing: {
          courtPricePerHour: formData.pricing.courtPricePerHour,
          memberDiscount: formData.pricing.memberDiscount || undefined
          // ELIMINADO: allowNonMembers - funcionalidad siempre habilitada
        },
        // Removidos allowTournaments y allowExternalPlayers
        // Estas funcionalidades están siempre habilitadas para clubes activos
        requireMembershipApproval: formData.requireMembershipApproval
      };

      console.log('Datos a enviar al backend:', clubData);
      
      // Crear el club
      console.log('🏟️ Creando club...');
      await firstValueFrom(this.servicioClub.crearClub(clubData));
      
      this.mostrarMensajeExito.set(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        const currentUrl = this.router.url;
        if (currentUrl.includes('/admin/')) {
          this.router.navigate(['/admin/system/clubs']);
        } else {
          this.router.navigate(['/clubes']);
        }
      }, 2000);

    } catch (error: any) {
      console.error('Error completo al crear club:', error);
      console.error('Error response:', error.error);
      console.error('Error message:', error.message);
      console.error('Error status:', error.status);
      console.error('Error statusText:', error.statusText);
      
      let errorMessage = 'Error al crear el club. Por favor, inténtalo de nuevo.';
      
      if (error.status === 409) {
        errorMessage = 'Ya existe un club con ese nombre. Por favor, elige otro nombre.';
      } else if (error.status === 403) {
        errorMessage = 'No tienes permisos para crear clubes. Contacta con el administrador.';
      } else if (error.status === 400) {
        errorMessage = 'Los datos proporcionados no son válidos. Por favor, revisa el formulario.';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
      
      this.error.set(errorMessage);
    } finally {
      this.guardando.set(false);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  volver() {
    // Determinar la ruta de vuelta según el contexto
    const currentUrl = this.router.url;
    if (currentUrl.includes('/admin/')) {
      this.router.navigate(['/admin/system/clubs']);
    } else {
      this.router.navigate(['/clubes']);
    }
  }
}
