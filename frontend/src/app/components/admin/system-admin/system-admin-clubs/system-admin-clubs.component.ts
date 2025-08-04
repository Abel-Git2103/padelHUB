import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Club } from '../../../../models/club.model';
import { ServicioClubes } from '../../../../services/clubes.service';

@Component({
  selector: 'app-system-admin-clubs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-admin-clubs.component.html',
  styleUrl: './system-admin-clubs.component.scss',
})
export class SystemAdminClubsComponent implements OnInit {
  clubes = signal<Club[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);

  constructor(
    private servicioClub: ServicioClubes,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cargarClubes();
  }

  async cargarClubes() {
    this.cargando.set(true);
    this.error.set(null);

    try {
      const clubes = await firstValueFrom(
        this.servicioClub.obtenerTodosClubes(),
      );
      this.clubes.set(clubes);
    } catch (error: any) {
      console.error('Error al cargar clubes:', error);
      this.error.set(
        'Error al cargar los clubes. Por favor, intenta de nuevo.',
      );
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
    return this.clubes().filter((club) => club.activo !== false).length;
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
    return (
      club.location?.address || club.direccion || 'Dirección no disponible'
    );
  }

  getClubCity(club: Club): string {
    return club.location?.city || club.ciudad || 'Ciudad no disponible';
  }

  getClubProvince(club: Club): string {
    return (
      club.location?.province || club.provincia || 'Provincia no disponible'
    );
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

  // Los torneos están incluidos por defecto en el plan de 200€/mes
  // Método eliminado: getClubAllowTournaments

  // Los jugadores externos están permitidos por defecto en el plan de 200€/mes
  // Método eliminado: getClubAllowExternalPlayers

  // Jugadores no miembros también están permitidos por defecto en el plan de 200€/mes
  // Método eliminado: getClubAllowNonMembers

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

  // Métodos para información dinámica del club
  getOpenMatches(club: Club): number {
    // Usar el valor del modelo o valor por defecto
    return club.currentOpenMatches ?? 0;
  }

  getActiveTournaments(club: Club): number {
    // Usar el valor del modelo o valor por defecto
    return club.currentActiveTournaments ?? 0;
  }

  getNationalRanking(club: Club): string {
    // Usar el valor del modelo o mostrar "Sin ranking"
    return club.currentNationalRanking ? `#${club.currentNationalRanking}` : 'Sin ranking';
  }

  // Métricas de ocupación
  getOccupiedCourts(club: Club): string {
    const occupied = club.currentOccupiedCourts ?? 0;
    const total = club.totalCourts || club.numeroPistas || 0;
    return `${occupied}/${total}`;
  }

  getOccupancyPercentage(club: Club): number {
    return club.occupancyPercentage ?? 0;
  }

  // Métricas de actividad reciente
  getNewMembersThisMonth(club: Club): number {
    return club.newMembersThisMonth ?? 0;
  }

  getTodayReservations(club: Club): number {
    return club.todayReservations ?? 0;
  }

  // Métricas de rendimiento
  getMonthlyRevenue(club: Club): string {
    const revenue = club.monthlyRevenue ?? 0;
    return `${revenue.toLocaleString('es-ES')}€`;
  }

  getAvgDailyReservations(club: Club): string {
    const avg = club.avgDailyReservations ?? 0;
    return avg.toFixed(1);
  }

  getOperatingHours(club: Club): boolean {
    return !!(club.operatingHours && Object.keys(club.operatingHours).length > 0);
  }

  getTodaySchedule(club: Club): string | null {
    if (!club.operatingHours) return null;
    
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayName = dayNames[new Date().getDay()];
    
    // Manejar tanto Map como objeto plano
    let todaySchedule;
    if (club.operatingHours instanceof Map) {
      todaySchedule = club.operatingHours.get(todayName);
    } else {
      todaySchedule = (club.operatingHours as any)[todayName];
    }
    
    if (todaySchedule && todaySchedule.open && todaySchedule.close) {
      return `${todaySchedule.open} - ${todaySchedule.close}`;
    }
    
    return 'Cerrado';
  }

  isCurrentlyOpen(club: Club): boolean {
    const schedule = this.getTodaySchedule(club);
    if (!schedule || schedule === 'Cerrado') return false;
    
    const now = new Date();
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    // Parsear horario (formato HH:MM)
    const [openTime, closeTime] = schedule.split(' - ');
    const [openHour, openMin] = openTime.split(':').map(Number);
    const [closeHour, closeMin] = closeTime.split(':').map(Number);
    
    const openTimeNum = openHour * 100 + openMin;
    const closeTimeNum = closeHour * 100 + closeMin;
    
    return currentTime >= openTimeNum && currentTime <= closeTimeNum;
  }

  getCurrentStatus(club: Club): string {
    return this.isCurrentlyOpen(club) ? '🟢 Abierto ahora' : '🔴 Cerrado';
  }
}
