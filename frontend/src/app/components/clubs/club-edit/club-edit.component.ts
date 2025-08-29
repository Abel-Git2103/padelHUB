import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ServicioClubes } from '../../../services/clubes.service';
import { ServicioAutenticacion } from '../../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Club } from '../../../models/club.model';

@Component({
  selector: 'app-club-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="club-register-container">
      <div class="register-header">
        <button class="back-button" (click)="volver()">
          ← Volver a Clubes
        </button>
        <h1>Editar Club</h1>
        <p class="subtitle" *ngIf="club()">Editando: {{ club()?.name }}</p>
      </div>

      <!-- Loading State -->
      <div class="loading-container" *ngIf="cargandoclub()">
        <div class="loading-spinner"></div>
        <p>Cargando información del club...</p>
      </div>

      <!-- Error State -->
      <div class="error-container" *ngIf="error()">
        <div class="error-icon">⚠️</div>
        <h3>Error al cargar el club</h3>
        <p>{{ error() }}</p>
        <button class="btn-retry" (click)="cargarClub()">
          Reintentar
        </button>
      </div>

      <!-- Edit Form -->
      <form [formGroup]="clubForm" (ngSubmit)="onSubmit()" class="club-form" *ngIf="!cargandoclub() && !error() && club()">
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
              <p>Tu club tiene acceso completo a todas las funcionalidades de PadelHUB:</p>
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
            {{ guardando() ? 'Guardando...' : 'Actualizar Club' }}
          </button>
        </div>
      </form>

      <!-- Mensaje de éxito -->
      <div class="success-message" *ngIf="mostrarMensajeExito()">
        ✅ Club actualizado exitosamente
      </div>

      <!-- Mensaje de error -->
      <div class="error-message-global" *ngIf="errorGuardado()">
        ❌ {{ errorGuardado() }}
      </div>
    </div>
  `,
  styleUrls: ['../club-register/club-register.component.scss']
})
export class ClubEditComponent implements OnInit {
  clubForm!: FormGroup;
  club = signal<Club | null>(null);
  cargandoclub = signal(true);
  guardando = signal(false);
  mostrarMensajeExito = signal(false);
  error = signal<string | null>(null);
  errorGuardado = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicioClub: ServicioClubes,
    private servicioAuth: ServicioAutenticacion,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkUserPermissions();
    this.initializeForm();
    
    // Cargar el club específico
    this.route.params.subscribe(params => {
      const clubId = params['id'];
      if (clubId) {
        this.cargarClub(clubId);
      } else {
        this.error.set('ID de club no válido');
        this.cargandoclub.set(false);
      }
    });
  }

  private checkUserPermissions() {
    const currentUser = this.servicioAuth.usuarioActual();
    
    if (!currentUser) {
      this.error.set('Debes estar autenticado para editar un club');
      this.router.navigate(['/login']);
      return;
    }

    const hasAdminPermissions = currentUser.rol === 'ADMIN_SISTEMA' || 
                               currentUser.rol === 'ADMIN_CLUB';
    
    if (!hasAdminPermissions) {
      this.error.set('No tienes permisos para editar clubes');
      return;
    }
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

  async cargarClub(clubId?: string) {
    this.cargandoclub.set(true);
    this.error.set(null);

    try {
      const id = clubId || this.route.snapshot.params['id'];
      const club = await firstValueFrom(this.servicioClub.obtenerClubPorId(id));
      this.club.set(club);
      
      // Llenar el formulario con los datos del club
      this.llenarFormulario(club);
      
    } catch (error: any) {
      console.error('Error al cargar club:', error);
      this.error.set(error.error?.message || 'Error al cargar la información del club');
    } finally {
      this.cargandoclub.set(false);
    }
  }

  private llenarFormulario(club: Club) {
    // Llenar datos básicos
    this.clubForm.patchValue({
      name: club.name,
      description: club.description,
      logo: club.logo || '',
      totalCourts: club.totalCourts,
      // Removidas allowTournaments y allowExternalPlayers
      // Estas funcionalidades están siempre habilitadas
      requireMembershipApproval: club.requireMembershipApproval || false
    });

    // Llenar contacto
    if (club.contact) {
      this.clubForm.get('contact')?.patchValue({
        email: club.contact.email,
        phone: club.contact.phone,
        website: club.contact.website || ''
      });
    }

    // Llenar ubicación
    if (club.location) {
      this.clubForm.get('location')?.patchValue({
        address: club.location.address,
        city: club.location.city,
        province: club.location.province,
        postalCode: club.location.postalCode
      });
    }

    // Llenar precios
    if (club.pricing) {
      this.clubForm.get('pricing')?.patchValue({
        courtPricePerHour: club.pricing.courtPricePerHour,
        memberDiscount: club.pricing.memberDiscount || 0
        // ELIMINADO: allowNonMembers - funcionalidad siempre habilitada
      });
    }
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
      return;
    }

    const club = this.club();
    if (!club?._id) {
      this.errorGuardado.set('No se pudo identificar el club a actualizar');
      return;
    }

    this.guardando.set(true);
    this.errorGuardado.set(null);

    try {
      const formData = this.clubForm.value;
      
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
        // Estas funcionalidades están siempre habilitadas
        requireMembershipApproval: formData.requireMembershipApproval
      };

      await firstValueFrom(this.servicioClub.actualizarClub(club._id, clubData));
      
      this.mostrarMensajeExito.set(true);
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        this.volver();
      }, 2000);

    } catch (error: any) {
      console.error('Error al actualizar club:', error);
      
      let errorMessage = 'Error al actualizar el club. Por favor, inténtalo de nuevo.';
      
      if (error.status === 409) {
        errorMessage = 'Ya existe un club con ese nombre. Por favor, elige otro nombre.';
      } else if (error.status === 403) {
        errorMessage = 'No tienes permisos para editar este club.';
      } else if (error.status === 400) {
        errorMessage = 'Los datos proporcionados no son válidos. Por favor, revisa el formulario.';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
      
      this.errorGuardado.set(errorMessage);
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
    this.router.navigate(['/admin/system/clubs']);
  }
}
