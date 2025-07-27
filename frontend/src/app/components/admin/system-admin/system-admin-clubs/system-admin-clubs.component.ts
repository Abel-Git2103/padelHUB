import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminBaseComponent } from '../../shared/admin-base.component';
import { ServicioClubes } from '../../../../services/clubes.service';
import { Club } from '../../../../models/club.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-system-admin-clubs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="system-admin-page">
      <div class="page-header">
        <div class="header-content">
          <div class="header-text">
            <h1>Gestión Global de Clubes</h1>
            <p>Administra todos los clubes de la plataforma PadelHUB</p>
          </div>
          <div class="header-actions">
            <button class="btn-primary" (click)="navegarARegistroClub()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Registrar Nuevo Club
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-container" *ngIf="cargando()">
        <div class="loading-spinner"></div>
        <p>Cargando clubes...</p>
      </div>

      <!-- Error State -->
      <div class="error-container" *ngIf="error()">
        <div class="error-icon">⚠️</div>
        <h3>Error al cargar clubes</h3>
        <p>{{ error() }}</p>
        <button class="btn-retry" (click)="cargarClubes()">
          Reintentar
        </button>
      </div>

      <!-- Clubs List -->
      <div class="clubs-container" *ngIf="!cargando() && !error()">
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">🏟️</div>
            <div class="stat-content">
              <h3>{{ clubes().length }}</h3>
              <p>Clubes Totales</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">✅</div>
            <div class="stat-content">
              <h3>{{ clubesActivos() }}</h3>
              <p>Clubes Activos</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🎾</div>
            <div class="stat-content">
              <h3>{{ totalPistas() }}</h3>
              <p>Pistas Totales</p>
            </div>
          </div>
        </div>

        <!-- Clubs Grid -->
        <div class="clubs-grid" *ngIf="clubes().length > 0">
          <div class="club-card" *ngFor="let club of clubes()">
            <div class="club-header">
              <div class="club-logo">
                <img *ngIf="club.logo" [src]="club.logo" [alt]="getClubName(club)" (error)="onImageError($event)"/>
                <div *ngIf="!club.logo" class="logo-placeholder">🏟️</div>
              </div>
              <div class="club-info">
                <h3>{{ getClubName(club) }}</h3>
                <p class="club-location">📍 {{ getClubAddress(club) }}</p>
                <p class="club-city">{{ getClubCity(club) }}, {{ getClubProvince(club) }}</p>
              </div>
            </div>
            
            <!-- Información del propietario/administradores -->
            <div class="club-owner-section" *ngIf="getClubAdministrators(club) && getClubAdministrators(club).length > 0">
              <h4>👤 Administradores</h4>
              <div class="admin-list">
                <div class="admin-item" *ngFor="let admin of getClubAdministrators(club); let i = index; trackBy: trackByAdmin">
                  <span class="admin-name">{{ getAdminName(admin) }}</span>
                  <span class="admin-email">{{ getAdminEmail(admin) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Información de contacto expandida -->
            <div class="club-contact-section">
              <h4>📞 Contacto</h4>
              <div class="contact-details">
                <div class="contact-item">
                  <span class="contact-icon">✉️</span>
                  <span class="contact-text">{{ getClubEmail(club) || 'No disponible' }}</span>
                </div>
                <div class="contact-item" *ngIf="getClubPhone(club)">
                  <span class="contact-icon">📱</span>
                  <span class="contact-text">{{ getClubPhone(club) }}</span>
                </div>
                <div class="contact-item" *ngIf="getClubWebsite(club)">
                  <span class="contact-icon">🌐</span>
                  <a [href]="getClubWebsite(club)" target="_blank" class="contact-link">
                    Sitio web
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Detalles del club -->
            <div class="club-details">
              <div class="detail-item">
                <span class="label">Pistas:</span>
                <span class="value">{{ getClubCourts(club) || 'N/A' }}</span>
              </div>
              <div class="detail-item">
                <span class="label">Precio/hora:</span>
                <span class="value">{{ getClubPrice(club) ? getClubPrice(club) + '€' : 'N/A' }}</span>
              </div>
              <div class="detail-item" *ngIf="getClubMemberDiscount(club)">
                <span class="label">Desc. miembros:</span>
                <span class="value discount">{{ getClubMemberDiscount(club) }}%</span>
              </div>
              <div class="detail-item">
                <span class="label">Estado:</span>
                <span class="value status" [class.active]="isClubActive(club)">
                  {{ getClubStatus(club) }}
                </span>
              </div>
            </div>

            <!-- Configuraciones del club -->
            <div class="club-settings">
              <div class="setting-badge" *ngIf="getClubAllowTournaments(club)">
                🏆 Torneos
              </div>
              <div class="setting-badge" *ngIf="getClubAllowExternalPlayers(club)">
                👥 Jugadores externos
              </div>
              <div class="setting-badge" *ngIf="getClubAllowNonMembers(club)">
                🔓 No miembros
              </div>
            </div>

            <div class="club-actions">
              <button class="btn-view" (click)="verDetallesClub(club._id!)" [disabled]="!club._id">
                Ver Detalles
              </button>
              <button 
                class="btn-edit" 
                (click)="editarClub(club._id!)" 
                [disabled]="!club._id"
                type="button"
              >
                Editar
              </button>
              <button class="btn-delete" disabled>
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="clubes().length === 0">
          <div class="empty-icon">🏟️</div>
          <h3>No hay clubes registrados</h3>
          <p>Comienza registrando el primer club de la plataforma</p>
          <button class="btn-primary" (click)="navegarARegistroClub()">
            Registrar Primer Club
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .system-admin-page {
      padding: 0;
    }
    
    .page-header {
      margin-bottom: 32px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
    }

    .header-text h1 {
      font-size: 32px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }
    
    .header-text p {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

    .header-actions .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #3b82f6;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .header-actions .btn-primary:hover {
      background: #2563eb;
    }

    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e9ecef;
      border-top: 4px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    .error-icon {
      font-size: 3rem;
      margin-bottom: 20px;
    }

    .btn-retry {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-retry:hover {
      background: #2563eb;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon {
      font-size: 2rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f5f9;
      border-radius: 12px;
    }

    .stat-content h3 {
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 4px 0;
    }

    .stat-content p {
      color: #64748b;
      margin: 0;
      font-size: 0.875rem;
    }

    .clubs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
      gap: 20px;
    }

    .club-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      min-height: 420px;
      display: flex;
      flex-direction: column;
    }

    .club-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .club-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .club-logo img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
    }

    .logo-placeholder {
      width: 50px;
      height: 50px;
      background: #f1f5f9;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }

    .club-info h3 {
      color: #1e293b;
      margin: 0 0 4px 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .club-location {
      color: #64748b;
      margin: 0;
      font-size: 0.875rem;
    }

    .club-details {
      margin-bottom: 16px;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .detail-item:last-child {
      border-bottom: none;
    }

    .detail-item .label {
      font-weight: 500;
      color: #374151;
    }

    .detail-item .value {
      color: #6b7280;
    }

    .detail-item .value.email {
      word-break: break-all;
    }

    .detail-item .value.discount {
      color: #f59e0b;
      font-weight: 600;
    }

    .detail-item .value.status {
      font-weight: 600;
      color: #ef4444;
    }

    .detail-item .value.status.active {
      color: #10b981;
    }

    /* Estilos para sección de administradores */
    .club-owner-section {
      margin: 16px 0;
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .club-owner-section h4 {
      margin: 0 0 8px 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
    }

    .admin-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .admin-item {
      display: flex;
      flex-direction: column;
      padding: 6px;
      background: white;
      border-radius: 4px;
      border: 1px solid #e5e7eb;
    }

    .admin-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .admin-email {
      font-size: 0.75rem;
      color: #6b7280;
    }

    /* Estilos para sección de contacto */
    .club-contact-section {
      margin: 16px 0;
      padding: 12px;
      background: #f0f9ff;
      border-radius: 8px;
    }

    .club-contact-section h4 {
      margin: 0 0 8px 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.875rem;
    }

    .contact-icon {
      font-size: 1rem;
    }

    .contact-text {
      color: #374151;
      word-break: break-word;
    }

    .contact-link {
      color: #3b82f6;
      text-decoration: none;
    }

    .contact-link:hover {
      text-decoration: underline;
    }

    /* Estilos para configuraciones del club */
    .club-settings {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 12px 0;
    }

    .setting-badge {
      background: #e0f2fe;
      color: #0369a1;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .club-city {
      color: #6b7280;
      font-size: 0.875rem;
      margin: 2px 0 0 0;
    }

    .club-actions {
      display: flex;
      gap: 8px;
      margin-top: auto;
      padding-top: 16px;
    }

    .btn-view, .btn-edit, .btn-delete {
      flex: 1;
      padding: 8px 12px;
      border: none;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-view {
      background: #3b82f6;
      color: white;
    }

    .btn-view:hover {
      background: #2563eb;
    }

    .btn-edit {
      background: #f59e0b;
      color: white;
    }

    .btn-edit:hover {
      background: #d97706;
    }

    .btn-delete {
      background: #ef4444;
      color: white;
      opacity: 0.6;
      cursor: not-allowed;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-icon {
      font-size: 4rem;
      margin-bottom: 20px;
    }

    .empty-state h3 {
      color: #1e293b;
      margin-bottom: 10px;
    }

    .empty-state p {
      color: #64748b;
      margin-bottom: 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .clubs-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SystemAdminClubsComponent implements OnInit {
  clubes = signal<Club[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  constructor(
    private servicioClub: ServicioClubes,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarClubes();
  }

  async cargarClubes() {
    this.cargando.set(true);
    this.error.set(null);

    try {
      const clubes = await firstValueFrom(this.servicioClub.obtenerTodosClubes());
      this.clubes.set(clubes);
    } catch (error: any) {
      console.error('Error al cargar clubes:', error);
      this.error.set('Error al cargar los clubes. Por favor, intenta de nuevo.');
    } finally {
      this.cargando.set(false);
    }
  }

  navegarARegistroClub() {
    this.router.navigate(['/admin/system/clubs/registrar']);
  }

  verDetallesClub(clubId: string) {
    if (clubId) {
      this.router.navigate(['/admin/system/clubs', clubId]);
    }
  }

  editarClub(clubId: string) {
    if (clubId) {
      this.router.navigate(['/admin/system/clubs/editar', clubId]);
    }
  }

  onImageError(event: any) {
    event.target.style.display = 'none';
  }

  // Computed properties
  clubesActivos(): number {
    return this.clubes().filter(club => club.activo !== false).length;
  }

  totalPistas(): number {
    return this.clubes().reduce((total, club) => {
      return total + (club.totalCourts || club.numeroPistas || 0);
    }, 0);
  }

  // Métodos auxiliares para compatibilidad de datos
  getClubName(club: Club): string {
    return club.name || club.nombre || 'Club sin nombre';
  }

  getClubAddress(club: Club): string {
    return club.location?.address || club.direccion || 'Dirección no disponible';
  }

  getClubCity(club: Club): string {
    return club.location?.city || club.ciudad || 'Ciudad no disponible';
  }

  getClubProvince(club: Club): string {
    return club.location?.province || club.provincia || 'Provincia no disponible';
  }

  getClubPhone(club: Club): string | null {
    return club.contact?.phone || club.telefono || null;
  }

  getClubEmail(club: Club): string | null {
    return club.contact?.email || club.email || null;
  }

  getClubWebsite(club: Club): string | null {
    return club.contact?.website || club.sitioWeb || null;
  }

  getClubCourts(club: Club): number | null {
    return club.totalCourts || club.numeroPistas || null;
  }

  getClubPrice(club: Club): number | null {
    return club.pricing?.courtPricePerHour || club.precioHora || null;
  }

  getClubMemberDiscount(club: Club): number | null {
    return club.pricing?.memberDiscount || null;
  }

  getClubStatus(club: Club): string {
    if (club.activo === false) return 'Inactivo';
    return club.estado || 'Activo';
  }

  isClubActive(club: Club): boolean {
    return club.activo !== false;
  }

  getClubAllowTournaments(club: Club): boolean {
    return club.allowTournaments !== false;
  }

  getClubAllowExternalPlayers(club: Club): boolean {
    return club.allowExternalPlayers !== false;
  }

  getClubAllowNonMembers(club: Club): boolean {
    return club.pricing?.allowNonMembers !== false;
  }

  // Métodos para administradores
  getClubAdministrators(club: Club): any[] {
    return club.administrators || [];
  }

  getAdminName(admin: any): string {
    if (typeof admin === 'string') return admin;
    return admin?.firstName && admin?.lastName 
      ? `${admin.firstName} ${admin.lastName}`
      : admin?.email || 'Administrador';
  }

  getAdminEmail(admin: any): string {
    if (typeof admin === 'string') return admin;
    return admin?.email || 'Email no disponible';
  }

  trackByAdmin(index: number, admin: any): any {
    return admin?._id || admin?.email || index;
  }
}
