export interface Club {
  _id?: string;
  nombre: string;
  direccion: string;
  telefono?: string;
  email?: string;
  sitioWeb?: string;
  ciudad?: string;
  codigoPostal?: string;
  capacidadMaxima?: number;
  numeroPistas?: number;
  precioHora?: number;
  calificacion?: number;
  imagen?: string;
  servicios?: string[];
  activo: boolean;
  fechaCreacion?: Date;
}

export interface SolicitudCrearClub {
  nombre: string;
  direccion: string;
  telefono?: string;
  email?: string;
  ciudad?: string;
  codigoPostal?: string;
  capacidadMaxima?: number;
}

export interface SolicitudActualizarClub {
  nombre?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
  ciudad?: string;
  codigoPostal?: string;
  capacidadMaxima?: number;
  numeroPistas?: number;
  precioHora?: number;
  servicios?: string[];
  activo?: boolean;
}
