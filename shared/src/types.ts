// Tipos básicos del dominio PadelHUB
export type GrupoNivel = 'A' | 'B' | 'C' | 'D' | 'E';
export type TipoPartido = 'simple' | 'interclubes';
export type TipoTorneo = 'interno' | 'interclubes';
export type EstadoTorneo = 'pendiente' | 'activo' | 'finalizado' | 'cancelado';
export type EstadoPartido = 'pendiente' | 'en_curso' | 'finalizado' | 'cancelado';
export type ResultadoPartido = 'victoria' | 'derrota' | 'empate';
export type TipoTransaccion = 'premio' | 'recarga' | 'inscripcion' | 'reembolso';

// Interfaces principales
export interface IUsuario {
  id: string;
  nombre: string;
  email: string;
  fechaRegistro: Date;
  grupo: GrupoNivel;
  clubId: string;
  activo: boolean;
  estadisticas: IEstadisticasUsuario;
  monedero: IMonedero;
}

export interface IEstadisticasUsuario {
  temporadaActual: IEstadisticasTemporada;
  historico: IEstadisticasTemporada[];
  puntosTotales: number;
  posicionRankingClub: number;
}

export interface IEstadisticasTemporada {
  temporada: string; // "2024-2025"
  victorias: number;
  empates: number;
  derrotas: number;
  puntos: number;
  torneosGanados: number;
  torneosParticipados: number;
}

export interface IMonedero {
  saldo: number;
  historialTransacciones: ITransaccionMonedero[];
}

export interface ITransaccionMonedero {
  id: string;
  fecha: Date;
  tipo: TipoTransaccion;
  cantidad: number;
  concepto: string;
  torneoId?: string;
  partidoId?: string;
}

export interface IClub {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  fechaRegistro: Date;
  activo: boolean;
  estadisticas: IEstadisticasClub;
  configuracion: IConfiguracionClub;
}

export interface IEstadisticasClub {
  puntosTotales: number;
  posicionRanking: number;
  jugadoresActivos: number;
  torneosOrganizados: number;
  torneosGanados: number;
}

export interface IConfiguracionClub {
  permitePartidosInterclub: boolean;
  permiteInscripcionDirecta: boolean;
  tarifaInscripcionTorneo: number;
}

export interface IPartido {
  id: string;
  fecha: Date;
  hora: string;
  tipo: TipoPartido;
  grupoNivel: GrupoNivel;
  clubId: string;
  estado: EstadoPartido;
  jugadores: IJugadorPartido[];
  resultado?: IResultadoPartido;
  observaciones?: string;
}

export interface IJugadorPartido {
  usuarioId: string;
  esOrganizador: boolean;
  confirmado: boolean;
  equipoNumero?: number; // 1 o 2 para partidos por equipos
}

export interface IResultadoPartido {
  sets: ISet[];
  ganadorEquipo?: number;
  puntosOtorgados: IPuntosPartido[];
}

export interface ISet {
  equipo1: number;
  equipo2: number;
}

export interface IPuntosPartido {
  usuarioId: string;
  puntos: number;
  resultado: ResultadoPartido;
}

export interface ITorneo {
  id: string;
  nombre: string;
  descripcion: string;
  tipo: TipoTorneo;
  grupoNivel: GrupoNivel;
  clubOrganizadorId: string;
  fechaInicio: Date;
  fechaFin: Date;
  fechaInscripcion: Date;
  fechaLimiteInscripcion: Date;
  estado: EstadoTorneo;
  configuracion: IConfiguracionTorneo;
  participantes: IParticipanteTorneo[];
  premios: IPremioTorneo[];
}

export interface IConfiguracionTorneo {
  maxParticipantes: number;
  minVictoriasRequeridas: number;
  tarifaInscripcion: number;
  formatoEliminacion: 'simple' | 'doble';
  tieneAscenso: boolean;
}

export interface IParticipanteTorneo {
  usuarioId: string;
  fechaInscripcion: Date;
  pagado: boolean;
  compañeroId?: string; // Para torneos interclubes
}

export interface IPremioTorneo {
  posicion: number;
  descripcion: string;
  saldoMonedero: number;
  permiteAscenso: boolean;
}

// DTOs para transferencia de datos
export interface CrearUsuarioDTO {
  nombre: string;
  email: string;
  grupo: GrupoNivel;
  clubId: string;
}

export interface ActualizarUsuarioDTO {
  nombre?: string;
  email?: string;
}

export interface CrearPartidoDTO {
  fecha: Date;
  hora: string;
  tipo: TipoPartido;
  grupoNivel: GrupoNivel;
  clubId: string;
  observaciones?: string;
}

export interface CrearTorneoDTO {
  nombre: string;
  descripcion: string;
  tipo: TipoTorneo;
  grupoNivel: GrupoNivel;
  clubOrganizadorId: string;
  fechaInicio: Date;
  fechaFin: Date;
  fechaLimiteInscripcion: Date;
  configuracion: IConfiguracionTorneo;
  premios: IPremioTorneo[];
}

// Respuestas de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Eventos de tiempo real
export interface EventoTiempoReal {
  tipo: string;
  datos: any;
  timestamp: Date;
  usuarioId?: string;
  clubId?: string;
}

export interface NotificacionUsuario {
  id: string;
  usuarioId: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  leida: boolean;
  fecha: Date;
  accion?: {
    tipo: string;
    url: string;
  };
}
