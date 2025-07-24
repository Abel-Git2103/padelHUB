export type RangoNivel = 'COBRE' | 'BRONCE' | 'PLATA' | 'ORO' | 'PLATINO';
export type TipoPartido = 'igualado' | 'no_igualado' | 'amistoso';
export type TipoTorneo = 'interno' | 'interclubes' | 'plataforma';
export type EstadoTorneo = 'pendiente' | 'inscripciones_abiertas' | 'activo' | 'finalizado' | 'cancelado';
export type EstadoPartido = 'pendiente' | 'confirmado' | 'en_curso' | 'finalizado' | 'cancelado';
export type ResultadoPartido = 'victoria' | 'derrota' | 'empate';
export type TipoTransaccion = 'premio' | 'recarga' | 'inscripcion' | 'reembolso';
export type TipoAscenso = 'automatico' | 'torneo' | 'invitacion';
export interface IUsuario {
    id: string;
    nombre: string;
    email: string;
    fechaRegistro: Date;
    rango: RangoNivel;
    clubId: string;
    activo: boolean;
    estadisticas: IEstadisticasUsuario;
    monedero: IMonedero;
    configuracion: IConfiguracionUsuario;
}
export interface IEstadisticasUsuario {
    temporadaActual: IEstadisticasTemporada;
    historico: IEstadisticasTemporada[];
    puntosTotales: number;
    posicionRankingClub: number;
    winRate: number;
    partidosJugados: number;
    puedeAscender: boolean;
    puntosParaSiguienteRango: number;
}
export interface IEstadisticasTemporada {
    temporada: string;
    victorias: number;
    empates: number;
    derrotas: number;
    puntos: number;
    torneosGanados: number;
    torneosParticipados: number;
    rangoInicial: RangoNivel;
    rangoFinal: RangoNivel;
    ascensos: number;
    degradaciones: number;
}
export interface IConfiguracionUsuario {
    notificacionesEmail: boolean;
    notificacionesPush: boolean;
    visibilidadPerfil: 'publico' | 'club' | 'privado';
    disponibilidadPartidos: 'siempre' | 'horarios' | 'nunca';
    horariosDisponibles?: IHorarioDisponible[];
}
export interface IHorarioDisponible {
    diaSemana: number;
    horaInicio: string;
    horaFin: string;
}
export interface IMonedero {
    saldo: number;
    historialTransacciones: ITransaccionMonedero[];
    saldoBloqueado: number;
}
export interface ITransaccionMonedero {
    id: string;
    fecha: Date;
    tipo: TipoTransaccion;
    cantidad: number;
    concepto: string;
    torneoId?: string;
    partidoId?: string;
    metodoPago?: string;
    estado: 'pendiente' | 'completada' | 'fallida' | 'reembolsada';
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
    instalaciones: IInstalacion[];
}
export interface IEstadisticasClub {
    puntosTotales: number;
    posicionRanking: number;
    jugadoresActivos: number;
    jugadoresPorRango: Record<RangoNivel, number>;
    torneosOrganizados: number;
    torneosGanados: number;
    partidosJugados: number;
    winRateGeneral: number;
}
export interface IConfiguracionClub {
    permitePartidosInterclub: boolean;
    permiteInscripcionDirecta: boolean;
    tarifaInscripcionTorneo: number;
    descuentosJugadores: number;
    horariosOperacion: IHorarioOperacion;
    reglasInternas: string[];
}
export interface IHorarioOperacion {
    lunes: IHorario;
    martes: IHorario;
    miercoles: IHorario;
    jueves: IHorario;
    viernes: IHorario;
    sabado: IHorario;
    domingo: IHorario;
}
export interface IHorario {
    abierto: boolean;
    horaApertura: string;
    horaCierre: string;
}
export interface IInstalacion {
    id: string;
    nombre: string;
    tipo: 'interior' | 'exterior';
    disponible: boolean;
    tarifaPorHora: number;
    caracteristicas: string[];
}
export interface IPartido {
    id: string;
    fecha: Date;
    hora: string;
    duracionEstimada: number;
    tipo: TipoPartido;
    rangoObjetivo: RangoNivel;
    clubId: string;
    instalacionId: string;
    estado: EstadoPartido;
    organizadorId: string;
    jugadores: IJugadorPartido[];
    resultado?: IResultadoPartido;
    observaciones?: string;
    costePorJugador: number;
    esCompetitivo: boolean;
}
export interface IJugadorPartido {
    usuarioId: string;
    esOrganizador: boolean;
    confirmado: boolean;
    equipoNumero: number;
    posicion: 'izquierda' | 'derecha';
    fechaConfirmacion?: Date;
    pagado: boolean;
}
export interface IResultadoPartido {
    sets: ISet[];
    ganadorEquipo: number;
    duracionReal: number;
    puntosOtorgados: IPuntosPartido[];
    validado: boolean;
    fechaValidacion?: Date;
    validadoPor?: string;
}
export interface ISet {
    equipo1: number;
    equipo2: number;
    tiebreak?: boolean;
    puntosEquipo1?: number;
    puntosEquipo2?: number;
}
export interface IPuntosPartido {
    usuarioId: string;
    puntosAnteriores: number;
    puntosGanados: number;
    puntosNuevos: number;
    resultado: ResultadoPartido;
    cambioRango?: {
        rangoAnterior: RangoNivel;
        rangoNuevo: RangoNivel;
        tipoAscenso?: TipoAscenso;
    };
}
export interface ITorneo {
    id: string;
    nombre: string;
    descripcion: string;
    tipo: TipoTorneo;
    rangoObjetivo: RangoNivel;
    clubOrganizadorId: string;
    fechaInicio: Date;
    fechaFin: Date;
    fechaInicioInscripcion: Date;
    fechaFinInscripcion: Date;
    estado: EstadoTorneo;
    configuracion: IConfiguracionTorneo;
    participantes: IParticipanteTorneo[];
    premios: IPremioTorneo[];
    patrocinadores?: IPatrocinador[];
    fases: IFaseTorneo[];
}
export interface IConfiguracionTorneo {
    maxParticipantes: number;
    minParticipantes: number;
    puntosMinimosAcceso: number;
    tarifaInscripcion: number;
    formatoEliminacion: 'simple' | 'doble';
    tieneAscenso: boolean;
    modalidad: 'individual' | 'parejas';
    rangoPermitido: RangoNivel[];
    permiteSubstitutos: boolean;
    limiteTiempoPartido: number;
}
export interface IParticipanteTorneo {
    usuarioId: string;
    fechaInscripcion: Date;
    pagado: boolean;
    compañeroId?: string;
    numeroSemilla?: number;
    puntosMomento: number;
    activo: boolean;
}
export interface IPremioTorneo {
    posicion: number;
    descripcion: string;
    saldoMonedero: number;
    puntosBonus: number;
    permiteAscenso: boolean;
    trofeo?: string;
}
export interface IPatrocinador {
    nombre: string;
    logo?: string;
    url?: string;
    aportacion: number;
}
export interface IFaseTorneo {
    numero: number;
    nombre: string;
    partidos: IPartidoTorneo[];
    fechaInicio: Date;
    fechaFin: Date;
    completada: boolean;
}
export interface IPartidoTorneo {
    id: string;
    torneoId: string;
    fase: number;
    participante1Id: string;
    participante2Id: string;
    compañero1Id?: string;
    compañero2Id?: string;
    fecha?: Date;
    resultado?: IResultadoPartido;
    ganadorAvanza: 'participante1' | 'participante2' | null;
}
export interface CrearUsuarioDTO {
    nombre: string;
    email: string;
    rango: RangoNivel;
    clubId: string;
    telefono?: string;
}
export interface ActualizarUsuarioDTO {
    nombre?: string;
    email?: string;
    telefono?: string;
    configuracion?: Partial<IConfiguracionUsuario>;
}
export interface CrearPartidoDTO {
    fecha: Date;
    hora: string;
    tipo: TipoPartido;
    rangoObjetivo: RangoNivel;
    clubId: string;
    instalacionId: string;
    costePorJugador: number;
    observaciones?: string;
}
export interface CrearTorneoDTO {
    nombre: string;
    descripcion: string;
    tipo: TipoTorneo;
    rangoObjetivo: RangoNivel;
    clubOrganizadorId: string;
    fechaInicio: Date;
    fechaFin: Date;
    fechaFinInscripcion: Date;
    configuracion: IConfiguracionTorneo;
    premios: IPremioTorneo[];
}
export interface InscribirTorneoDTO {
    torneoId: string;
    usuarioId: string;
    compañeroId?: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: string[];
    timestamp: Date;
}
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface EventoTiempoReal {
    tipo: string;
    datos: any;
    timestamp: Date;
    usuarioId?: string;
    clubId?: string;
    rangoAfectado?: RangoNivel;
}
export interface NotificacionUsuario {
    id: string;
    usuarioId: string;
    titulo: string;
    mensaje: string;
    tipo: 'info' | 'warning' | 'success' | 'error' | 'ascenso' | 'degradacion';
    leida: boolean;
    fecha: Date;
    accion?: {
        tipo: 'url' | 'modal' | 'refresh';
        valor: string;
        texto: string;
    };
    categoria: 'partido' | 'torneo' | 'ranking' | 'monedero' | 'sistema';
}
export interface IRankingClub {
    clubId: string;
    nombre: string;
    puntosTotales: number;
    posicion: number;
    cambiosRecientes: number;
    jugadoresActivos: number;
    winRate: number;
    partidosJugados: number;
}
export interface IRankingUsuario {
    usuarioId: string;
    nombre: string;
    rango: RangoNivel;
    puntos: number;
    posicionEnClub: number;
    posicionGlobal: number;
    winRate: number;
    partidosJugados: number;
    tendencia: 'subiendo' | 'bajando' | 'estable';
}
//# sourceMappingURL=types.d.ts.map