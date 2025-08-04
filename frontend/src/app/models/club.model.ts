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
  operatingHours?: Map<string, { open: string; close: string }>;
  // Removidas allowTournaments y allowExternalPlayers
  // Estas funcionalidades están siempre habilitadas (parte del valor de 200€/mes)
  requireMembershipApproval?: boolean;
  estado?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  
  // Lista de administradores del club
  administrators?: any[];
  
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
