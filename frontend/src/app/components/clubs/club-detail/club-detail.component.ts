import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Club } from '../../../models/club.model';
import { ServicioClubes } from '../../../services/clubes.service';
import { ServicioAutenticacion } from '../../../services/auth.service';
import { BaseComponent } from '../../../shared/base-component';

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="club-detail-container">
      <!-- Loading State -->
      <div class="loading-container" *ngIf="cargando()">
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
        <button class="btn-back" (click)="volver()">
          Volver a Clubes
        </button>
      </div>

      <!-- Club Details -->
      <div class="club-content" *ngIf="!cargando() && !error() && club()">
        <!-- Header -->
        <header class="club-header">
          <button class="back-button" (click)="volver()">
            ← Volver a Clubes
          </button>
          
          <div class="club-main-info">
            <div class="club-logo-container">
              <img 
                *ngIf="club()?.logo" 
                [src]="club()?.logo" 
                [alt]="'Logo de ' + club()?.name"
                class="club-logo"
                (error)="onImageError($event)"
              />
              <div *ngIf="!club()?.logo" class="club-logo-placeholder">
                🏟️
              </div>
            </div>
            
            <div class="club-basic-info">
              <h1>{{ club()?.name }}</h1>
              <p class="club-description">{{ club()?.description }}</p>
              
              <div class="club-info-summary">
                <div class="info-item">
                  🎾 {{ club()?.totalCourts }} pista{{ club()?.totalCourts !== 1 ? 's' : '' }}
                </div>
                <div class="info-item">
                  💰 {{ club()?.pricing?.courtPricePerHour || 'N/A' }}€/hora
                </div>
                <div class="info-item">
                  � {{ club()?.location?.city }}, {{ club()?.location?.province }}
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Club Info Grid -->
        <div class="club-info-grid">
          <!-- Contact Information -->
          <div class="info-card">
            <h3>📞 Información de Contacto</h3>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-label">Email:</span>
                <a [href]="'mailto:' + club()?.contact?.email" class="contact-link">
                  {{ club()?.contact?.email }}
                </a>
              </div>
              
              <div class="contact-item">
                <span class="contact-label">Teléfono:</span>
                <a [href]="'tel:' + club()?.contact?.phone" class="contact-link">
                  {{ club()?.contact?.phone }}
                </a>
              </div>
              
              <div class="contact-item" *ngIf="club()?.contact?.website">
                <span class="contact-label">Sitio web:</span>
                <a [href]="club()?.contact?.website" target="_blank" class="contact-link">
                  🌐 Visitar sitio web
                </a>
              </div>
            </div>
          </div>

          <!-- Location Information -->
          <div class="info-card">
            <h3>📍 Ubicación</h3>
            <div class="location-info">
              <p class="address">
                <strong>{{ club()?.location?.address }}</strong>
              </p>
              <p class="city-province">
                {{ club()?.location?.city }}, {{ club()?.location?.province }}
              </p>
              <p class="postal-code">
                CP: {{ club()?.location?.postalCode }}
              </p>
              
              <div class="map-placeholder" *ngIf="club()?.location?.coordinates">
                📍 Ver en el mapa
              </div>
            </div>
          </div>

          <!-- Pricing Information -->
          <div class="info-card">
            <h3>💰 Precios</h3>
            <div class="pricing-info">
              <div class="price-item">
                <span class="price-label">Precio por hora:</span>
                <span class="price-value">{{ club()?.pricing?.courtPricePerHour }}€</span>
              </div>
              
              <div class="price-item" *ngIf="club()?.pricing?.memberDiscount && (club()?.pricing?.memberDiscount ?? 0) > 0">
                <span class="price-label">Descuento miembros:</span>
                <span class="price-value discount">{{ club()?.pricing?.memberDiscount }}%</span>
              </div>
              
              <div class="price-note">
                ✅ Acepta jugadores de cualquier club
              </div>
            </div>
          </div>

          <!-- Operating Hours -->
          <div class="info-card">
            <h3>🕐 Horario de Servicio</h3>
            <div class="hours-info">
              <!-- Horario de hoy -->
              <div class="today-hours">
                <span class="today-label">Hoy:</span>
                <span class="today-time">{{ getTodayHours() }}</span>
                <span class="status-badge" [class]="getTodayStatus().class">
                  {{ getTodayStatus().text }}
                </span>
              </div>
              
              <!-- Horarios por día -->
              <div class="week-hours">
                <div class="day-hours" *ngFor="let day of getWeekDays(); let i = index" 
                     [class.current-day]="day.isToday">
                  <span class="day-name">{{ day.name }}</span>
                  <span class="day-time">{{ day.hours }}</span>
                </div>
                
                <!-- Mensaje si no hay días -->
                <div *ngIf="getWeekDays().length === 0" class="no-hours-message">
                  ⚠️ No se encontraron horarios para mostrar
                </div>
              </div>
            </div>
          </div>

          <!-- Facilities Information -->
          <div class="info-card">
            <h3>🏟️ Instalaciones y Servicios</h3>
            <div class="facilities-info">
              <div class="facility-item">
                <span class="facility-icon">🎾</span>
                <span>{{ club()?.totalCourts }} pista{{ club()?.totalCourts !== 1 ? 's' : '' }} de pádel</span>
              </div>
              
              <div class="facility-item">
                <span class="facility-icon">🏆</span>
                <span>Organización de torneos</span>
              </div>
              
              <div class="facility-item">
                <span class="facility-icon">👥</span>
                <span>Acepta jugadores de otros clubes</span>
              </div>
              
              <div class="facility-item">
                <span class="facility-icon">📊</span>
                <span>Participa en rankings nacionales</span>
              </div>
              
              <div class="facility-item" *ngIf="club()?.requireMembershipApproval">
                <span class="facility-icon">✋</span>
                <span>Requiere aprobación para membresía</span>
              </div>
              
              <div class="facility-item" *ngIf="club()?.pricing?.memberDiscount && (club()?.pricing?.memberDiscount ?? 0) > 0">
                <span class="facility-icon">💰</span>
                <span>{{ club()?.pricing?.memberDiscount }}% descuento para miembros</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Image Gallery -->
        <div class="image-gallery" *ngIf="club()?.images && (club()?.images?.length ?? 0) > 0">
          <h3>📷 Galería de Imágenes</h3>
          <div class="gallery-grid">
            <div class="gallery-item" *ngFor="let image of club()?.images">
              <img 
                [src]="image" 
                [alt]="'Imagen de ' + club()?.name"
                class="gallery-image"
                (error)="onImageError($event)"
              />
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-primary" disabled>
            🎾 Reservar Pista
            <small>(Próximamente)</small>
          </button>
          
          <button class="btn-secondary" disabled>
            👥 Unirse al Club
            <small>(Próximamente)</small>
          </button>
          
          <button class="btn-secondary" (click)="contactarClub()">
            📞 Contactar
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent extends BaseComponent implements OnInit {
  club = signal<Club | null>(null);
  cargando = signal(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioClub: ServicioClubes,
    private servicioAuth: ServicioAutenticacion
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const clubId = params['id'];
      if (clubId) {
        this.cargarClub(clubId);
      } else {
        this.error.set('ID de club no válido');
        this.cargando.set(false);
      }
    });
  }

  async cargarClub(clubId?: string) {
    this.cargando.set(true);
    this.error.set(null);

    try {
      const id = clubId || this.route.snapshot.params['id'];
      const club = await firstValueFrom(this.servicioClub.obtenerClubPorId(id));
      this.club.set(club);
    } catch (error: any) {
      console.error('Error al cargar club:', error);
      this.error.set(error.error?.message || 'Error al cargar la información del club');
    } finally {
      this.cargando.set(false);
    }
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
  }

  contactarClub() {
    const club = this.club();
    if (club?.contact?.email) {
      const subject = encodeURIComponent(`Consulta sobre ${club.name}`);
      const body = encodeURIComponent(`Hola,\n\nMe gustaría obtener más información sobre ${club.name}.\n\nGracias.`);
      window.open(`mailto:${club.contact.email}?subject=${subject}&body=${body}`);
    } else if (club?.contact?.phone) {
      window.open(`tel:${club.contact.phone}`);
    }
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

  // Métodos para horarios de servicio
  getTodayHours(): string {
    const club = this.club();
    
    if (!club?.operatingHours) {
      return 'No disponible';
    }
    
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = dayNames[new Date().getDay()];
    
    const todayHours = club.operatingHours[todayName];
    
    if (!todayHours?.open || !todayHours?.close) {
      return 'Cerrado';
    }
    
    return `${todayHours.open} - ${todayHours.close}`;
  }

  getTodayStatus(): { text: string; class: string } {
    const club = this.club();
    
    if (!club?.operatingHours) {
      return { text: 'Sin información', class: 'unknown' };
    }
    
    const now = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = dayNames[now.getDay()];
    
    const todayHours = club.operatingHours[todayName];
    
    if (!todayHours?.open || !todayHours?.close) {
      return { text: 'Cerrado', class: 'closed' };
    }
    
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = todayHours.open.split(':').map(Number);
    const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    if (currentTime >= openTime && currentTime <= closeTime) {
      return { text: 'Abierto', class: 'open' };
    } else {
      return { text: 'Cerrado', class: 'closed' };
    }
  }

  getWeekDays(): Array<{ name: string; hours: string; isToday: boolean }> {
    const club = this.club();
    
    if (!club?.operatingHours) {
      return [];
    }
    
    const dayNames = [
      { key: 'monday', name: 'Lunes' },
      { key: 'tuesday', name: 'Martes' },
      { key: 'wednesday', name: 'Miércoles' },
      { key: 'thursday', name: 'Jueves' },
      { key: 'friday', name: 'Viernes' },
      { key: 'saturday', name: 'Sábado' },
      { key: 'sunday', name: 'Domingo' }
    ];
    
    const today = new Date().getDay();
    const todayIndex = today === 0 ? 6 : today - 1; // Convertir domingo (0) a índice 6
    
    const result = dayNames.map((day, index) => {
      const dayHours = club.operatingHours?.[day.key];
      let hours = 'Cerrado';
      
      if (dayHours?.open && dayHours?.close) {
        hours = `${dayHours.open} - ${dayHours.close}`;
      }
      
      return {
        name: day.name,
        hours: hours,
        isToday: index === todayIndex
      };
    });
    
    return result;
  }
}
