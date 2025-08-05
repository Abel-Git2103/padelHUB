// Interfaces para información de contacto del club
export interface ClubContact {
  email: string;
  phone: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

// Interfaces para ubicación del club
export interface ClubLocation {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  coordinates?: [number, number];
}

// Interfaces para precios del club
export interface ClubPricing {
  courtPricePerHour: number;
  memberDiscount?: number;
  // ELIMINADO: allowNonMembers - todos los clubes activos aceptan jugadores externos
  // Esta funcionalidad está incluida en la suscripción mensual
}

// Interfaces para restricciones del club (solo administradores del sistema)
export interface ClubRestriction {
  type: RestrictionType;
  reason: string;
  appliedDate: Date;
  expiryDate?: Date;
  appliedBy: string; // ID del administrador del sistema
  isActive: boolean;
}

export enum RestrictionType {
  SUSPENDED = 'suspended', // Club suspendido temporalmente
  BANNED = 'banned', // Club baneado permanentemente
  MAINTENANCE = 'maintenance', // En modo mantenimiento
  VERIFICATION_PENDING = 'verification_pending', // Pendiente de verificación
  NO_RESERVATIONS = 'no_reservations', // No puede recibir nuevas reservas
  NO_TOURNAMENTS = 'no_tournaments', // No puede organizar torneos
  LIMITED_MEMBERS = 'limited_members', // Límite en número de miembros
  NO_EXTERNAL_PLAYERS = 'no_external_players', // No puede aceptar jugadores externos
  PAYMENT_FROZEN = 'payment_frozen', // Pagos congelados
  HIDDEN_FROM_SEARCH = 'hidden_from_search' // Oculto de búsquedas públicas
}

export interface ClubRestrictions {
  isRestricted: boolean;
  activeRestrictions: ClubRestriction[];
  restrictionsSummary?: string[]; // Resumen de restricciones activas para mostrar en UI
}

export interface Club {
  _id?: string;
  name: string;
  description: string;
  logo?: string;
  images?: string[];
  contact: ClubContact;
  location: ClubLocation;
  pricing: ClubPricing;
  totalCourts: number;
  operatingHours?: { [key: string]: { open: string; close: string } };
  // Removidas allowTournaments y allowExternalPlayers
  // Estas funcionalidades están siempre habilitadas (parte del valor de 200€/mes)
  requireMembershipApproval?: boolean;
  estado?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  
  // Lista de administradores del club
  administrators?: any[];
  
  // Sistema de restricciones (solo para administradores del sistema)
  restrictions?: ClubRestrictions;
  
  // Métricas en tiempo real del club
  currentOpenMatches?: number; // Partidos abiertos actualmente esperando jugadores
  currentActiveTournaments?: number; // Torneos activos en este momento
  currentNationalRanking?: number; // Posición actual en ranking nacional
  
  // Métricas de ocupación
  currentOccupiedCourts?: number; // Pistas ocupadas en este momento
  occupancyPercentage?: number; // Porcentaje de ocupación actual
  
  // Métricas de actividad reciente
  newMembersThisMonth?: number; // Nuevos miembros este mes
  todayReservations?: number; // Reservas de hoy
  
  // Métricas de rendimiento
  monthlyRevenue?: number; // Ingresos del mes actual
  avgDailyReservations?: number; // Promedio de reservas por día
  
  // Campos de compatibilidad con el modelo anterior
  nombre?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  sitioWeb?: string;
  ciudad?: string;
  provincia?: string;
  codigoPostal?: string;
  numeroPistas?: number;
  precioHora?: number;
  calificacion?: number;
  imagen?: string;
  servicios?: string[];
  activo?: boolean;
}

export interface SolicitudCrearClub {
  name: string;
  description: string;
  logo?: string;
  images?: string[];
  contact: ClubContact;
  location: ClubLocation;
  pricing: ClubPricing;
  totalCourts: number;
  operatingHours?: Map<string, { open: string; close: string }>;
  // Removidas allowTournaments y allowExternalPlayers
  // Estas funcionalidades están siempre habilitadas para clubes activos
  requireMembershipApproval?: boolean;
}

export interface SolicitudActualizarClub {
  name?: string;
  description?: string;
  logo?: string;
  images?: string[];
  contact?: ClubContact;
  location?: ClubLocation;
  pricing?: ClubPricing;
  totalCourts?: number;
  operatingHours?: Map<string, { open: string; close: string }>;
  // Removidas allowTournaments y allowExternalPlayers
  // Estas funcionalidades están siempre habilitadas para clubes activos
  requireMembershipApproval?: boolean;
}
