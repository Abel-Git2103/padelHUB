export interface Usuario {
  _id?: string;
  nombre: string;
  apellido?: string;
  email: string;
  telefono?: string;
  ciudad?: string;
  fechaNacimiento?: Date;
  rango: 'PLATINO' | 'ORO' | 'PLATA' | 'BRONCE' | 'COBRE';
  club?: string;
  activo: boolean;
  fechaRegistro?: Date;
  puntos?: number;
  partidosJugados?: number;
  partidosGanados?: number;
}

export interface RespuestaAutenticacion {
  token_acceso: string;
  usuario: Usuario;
}

export interface SolicitudLogin {
  email: string;
  contrasena: string;
}

export interface SolicitudRegistro {
  nombre: string;
  email: string;
  contrasena: string;
  telefono?: string;
  fechaNacimiento?: Date;
  rango: 'PLATINO' | 'ORO' | 'PLATA' | 'BRONCE' | 'COBRE';
  club?: string;
}
