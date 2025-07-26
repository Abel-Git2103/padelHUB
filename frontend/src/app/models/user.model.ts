export interface Usuario {
  id: string;
  email: string;
  nombreCompleto: string;
  nombre: string;
  apellidos: string;
  rangoActual: 'PLATINO' | 'ORO' | 'PLATA' | 'BRONCE' | 'COBRE';
  rol: string;
  imagenPerfil?: string;
  idClub?: string;
  estaActivo: boolean;
  emailVerificado: boolean;
  fechaCreacion: string;
  ultimaActividad: string;
}

export interface RespuestaAutenticacion {
  accessToken: string;
  refreshToken: string;
  user: Usuario;
  expiresIn: number;
}

export interface SolicitudLogin {
  email: string;
  password: string;
}

export interface SolicitudRegistro {
  email: string;
  password: string;
  nombre: string;
  apellidos: string;
  telefono?: string;
  fechaNacimiento?: string;
  rangoActual?: 'PLATINO' | 'ORO' | 'PLATA' | 'BRONCE' | 'COBRE';
  idClub?: string;
}
