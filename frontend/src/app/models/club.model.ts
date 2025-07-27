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
  allowNonMembers?: boolean;
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
  allowTournaments?: boolean;
  allowExternalPlayers?: boolean;
  requireMembershipApproval?: boolean;
  estado?: string;
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  
  // Lista de administradores del club
  administrators?: any[];
  
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
  allowTournaments?: boolean;
  allowExternalPlayers?: boolean;
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
  allowTournaments?: boolean;
  allowExternalPlayers?: boolean;
  requireMembershipApproval?: boolean;
}
