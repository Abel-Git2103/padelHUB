import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Club, RestrictionType, ClubRestriction } from '../../../../models/club.model';
import { ServicioClubes } from '../../../../services/clubes.service';
import { ServicioAutenticacion } from '../../../../services/auth.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-system-admin-clubs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './system-admin-clubs.component.html',
  styleUrl: './system-admin-clubs.component.scss',
})
export class SystemAdminClubsComponent implements OnInit {
  clubes = signal<Club[]>([]);
  cargando = signal(false);
  error = signal<string | null>(null);
  
  // Signals para el modal de restricciones
  showRestrictionsModal = signal(false);
  selectedClub = signal<Club | null>(null);
  selectedRestrictionType = signal<RestrictionType | null>(null);
  restrictionReason = signal('');

  constructor(
    private servicioClub: ServicioClubes,
    private router: Router,
    private servicioAuth: ServicioAutenticacion,
    private toastService: ToastService,
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
      
      // Toast informativo al cargar correctamente
      if (clubes.length > 0) {
        this.toastService.info(`${clubes.length} clubes cargados correctamente.`, 3000);
      }
    } catch (error: any) {
      console.error('Error al cargar clubes:', error);
      const errorMessage = 'Error al cargar los clubes. Por favor, intenta de nuevo.';
      this.error.set(errorMessage);
      this.toastService.error(errorMessage);
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
    return Math.round(avg).toString();
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

  // Métodos para sistema de restricciones
  
  getRestrictionTypes() {
    return [
      { value: RestrictionType.SUSPENDED, label: '🚫 Suspender Club', description: 'Club temporalmente inactivo' },
      { value: RestrictionType.BANNED, label: '❌ Banear Club', description: 'Club permanentemente bloqueado' },
      { value: RestrictionType.MAINTENANCE, label: '🔧 Modo Mantenimiento', description: 'Visible pero sin funcionalidades' },
      { value: RestrictionType.VERIFICATION_PENDING, label: '⏳ Verificación Pendiente', description: 'Requiere revisión antes de activarse' },
      { value: RestrictionType.NO_RESERVATIONS, label: '📅 Sin Reservas', description: 'No puede recibir nuevas reservas' },
      { value: RestrictionType.NO_TOURNAMENTS, label: '🏆 Sin Torneos', description: 'No puede organizar torneos' },
      { value: RestrictionType.LIMITED_MEMBERS, label: '👥 Miembros Limitados', description: 'Límite en número de miembros' },
      { value: RestrictionType.NO_EXTERNAL_PLAYERS, label: '🚷 Sin Jugadores Externos', description: 'No puede aceptar jugadores externos' },
      { value: RestrictionType.PAYMENT_FROZEN, label: '💳 Pagos Congelados', description: 'Facturación suspendida' },
      { value: RestrictionType.HIDDEN_FROM_SEARCH, label: '🔍 Oculto de Búsquedas', description: 'No visible en búsquedas públicas' }
    ];
  }

  isClubRestricted(club: Club): boolean {
    return club.restrictions?.isRestricted ?? false;
  }

  getActiveRestrictions(club: Club): ClubRestriction[] {
    return club.restrictions?.activeRestrictions?.filter(r => r.isActive) ?? [];
  }

  getRestrictionsDisplay(club: Club): string {
    const restrictions = this.getActiveRestrictions(club);
    if (restrictions.length === 0) return '';
    if (restrictions.length === 1) {
      return this.getRestrictionLabel(restrictions[0].type);
    }
    return `${restrictions.length} restricciones activas`;
  }

  getRestrictionLabel(type: RestrictionType): string {
    const restrictionMap = {
      [RestrictionType.SUSPENDED]: 'Suspendido',
      [RestrictionType.BANNED]: 'Baneado',
      [RestrictionType.MAINTENANCE]: 'Mantenimiento',
      [RestrictionType.VERIFICATION_PENDING]: 'Verificación Pendiente',
      [RestrictionType.NO_RESERVATIONS]: 'Sin Reservas',
      [RestrictionType.NO_TOURNAMENTS]: 'Sin Torneos',
      [RestrictionType.LIMITED_MEMBERS]: 'Miembros Limitados',
      [RestrictionType.NO_EXTERNAL_PLAYERS]: 'Sin Externos',
      [RestrictionType.PAYMENT_FROZEN]: 'Pagos Congelados',
      [RestrictionType.HIDDEN_FROM_SEARCH]: 'Oculto'
    };
    return restrictionMap[type] || 'Restricción';
  }

  getRestrictionIcon(type: RestrictionType): string {
    const iconMap = {
      [RestrictionType.SUSPENDED]: '🚫',
      [RestrictionType.BANNED]: '❌',
      [RestrictionType.MAINTENANCE]: '🔧',
      [RestrictionType.VERIFICATION_PENDING]: '⏳',
      [RestrictionType.NO_RESERVATIONS]: '📅',
      [RestrictionType.NO_TOURNAMENTS]: '🏆',
      [RestrictionType.LIMITED_MEMBERS]: '👥',
      [RestrictionType.NO_EXTERNAL_PLAYERS]: '🚷',
      [RestrictionType.PAYMENT_FROZEN]: '💳',
      [RestrictionType.HIDDEN_FROM_SEARCH]: '🔍'
    };
    return iconMap[type] || '⚠️';
  }

  getClubRestrictionsClass(club: Club): string {
    const restrictions = this.getActiveRestrictions(club);
    if (restrictions.length === 0) return '';
    
    if (restrictions.some(r => r.type === RestrictionType.BANNED)) return 'club-banned';
    if (restrictions.some(r => r.type === RestrictionType.SUSPENDED)) return 'club-suspended';
    if (restrictions.some(r => r.type === RestrictionType.MAINTENANCE)) return 'club-maintenance';
    
    return 'club-restricted';
  }

  getRestrictionDescription(type: RestrictionType | null): string {
    if (!type) return '';
    const restrictionType = this.getRestrictionTypes().find(t => t.value === type);
    return restrictionType?.description || '';
  }

  // Modal y acciones de restricciones
  openRestrictionsModal(club: Club) {
    this.selectedClub.set(club);
    this.selectedRestrictionType.set(null);
    this.restrictionReason.set('');
    this.showRestrictionsModal.set(true);
  }

  closeRestrictionsModal() {
    this.showRestrictionsModal.set(false);
    this.selectedClub.set(null);
    this.selectedRestrictionType.set(null);
    this.restrictionReason.set('');
  }

  async applyRestriction() {
    const club = this.selectedClub();
    const restrictionType = this.selectedRestrictionType();
    const reason = this.restrictionReason();

    if (!club || !restrictionType || !reason.trim()) {
      this.toastService.warning('Por favor, selecciona una restricción y proporciona un motivo.');
      return;
    }

    if (!club._id) {
      this.toastService.error('Error: ID del club no disponible.');
      return;
    }

    // Obtener el usuario actual para el campo appliedBy
    const currentUser = this.servicioAuth.usuarioActual();
    if (!currentUser || !currentUser.id) {
      this.toastService.error('Error: Usuario no identificado. Inicia sesión nuevamente.');
      return;
    }

    try {
      // Llamada real al servicio para aplicar la restricción
      const updatedClub = await firstValueFrom(
        this.servicioClub.aplicarRestriccion(club._id, restrictionType, reason, currentUser.id)
      );
      
      // Actualizar el club en la lista local
      const clubs = this.clubes();
      const clubIndex = clubs.findIndex(c => c._id === club._id);
      if (clubIndex >= 0) {
        const updatedClubs = [...clubs];
        updatedClubs[clubIndex] = updatedClub;
        this.clubes.set(updatedClubs);
        
        // También actualizar el club seleccionado para refrescar la modal inmediatamente
        this.selectedClub.set(updatedClub);
      }

      // Limpiar el formulario de nueva restricción
      this.selectedRestrictionType.set(null);
      this.restrictionReason.set('');

      this.toastService.success(`Restricción "${this.getRestrictionLabel(restrictionType)}" aplicada correctamente al club ${this.getClubName(club)}.`);
    } catch (error: any) {
      console.error('Error al aplicar restricción:', error);
      const errorMessage = error.error?.message || 'Error al aplicar la restricción. Inténtalo de nuevo.';
      this.toastService.error(errorMessage);
    }
  }

  async removeRestriction(club: Club, restriction: ClubRestriction) {
    // Usar toast con acción para confirmación
    this.toastService.withAction(
      `¿Quitar restricción "${this.getRestrictionLabel(restriction.type)}" del club ${this.getClubName(club)}?`,
      'warning',
      'Confirmar',
      () => this.confirmRemoveRestriction(club, restriction),
      8000
    );
  }

  private async confirmRemoveRestriction(club: Club, restriction: ClubRestriction) {
    if (!club._id) {
      this.toastService.error('Error: ID del club no disponible.');
      return;
    }

    try {
      // Llamada real al servicio para quitar la restricción
      const updatedClub = await firstValueFrom(
        this.servicioClub.quitarRestriccion(club._id, restriction.type)
      );
      
      // Actualizar el club en la lista local
      const clubs = this.clubes();
      const clubIndex = clubs.findIndex(c => c._id === club._id);
      if (clubIndex >= 0) {
        const updatedClubs = [...clubs];
        updatedClubs[clubIndex] = updatedClub;
        this.clubes.set(updatedClubs);
        
        // También actualizar el club seleccionado para refrescar la modal inmediatamente
        this.selectedClub.set(updatedClub);
      }

      this.toastService.success(`Restricción "${this.getRestrictionLabel(restriction.type)}" eliminada correctamente del club ${this.getClubName(club)}.`);
    } catch (error: any) {
      console.error('Error al quitar restricción:', error);
      const errorMessage = error.error?.message || 'Error al quitar la restricción. Inténtalo de nuevo.';
      this.toastService.error(errorMessage);
    }
  }
}
