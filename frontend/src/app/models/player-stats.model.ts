export interface PlayerStats {
  victorias: number;
  empates: number;
  derrotas: number;
  totalPartidos: number;
  efectividad: number;
  rachaActual: {
    tipo: 'victorias' | 'derrotas' | 'empates';
    cantidad: number;
  };
  rankingClub: {
    posicion: number;
    total: number;
  };
  rankingGlobal: {
    posicion: number;
    total: number;
  };
  progresoObjetivos: {
    torneoVictoriasRestantes: number;
    ascensoVictoriasRestantes: number;
  };
}

export interface PlayerHistoricalStats {
  temporadasJugadas: number;
  totalVictorias: number;
  totalPartidos: number;
  ascensosConseguidos: number;
  torneosGanados: number;
  estadisticasPorTemporada: TemporadaStats[];
}

export interface TemporadaStats {
  temporada: string;
  victorias: number;
  empates: number;
  derrotas: number;
  esActual: boolean;
}

export interface MatchHistory {
  id: string;
  fecha: string;
  resultado: 'victoria' | 'derrota' | 'empate';
  jugadores: {
    equipo1: {
      jugador1: string;
      jugador2: string;
    };
    equipo2: {
      jugador1: string;
      jugador2: string;
    };
  };
  sets: {
    set1: string;
    set2: string;
    set3?: string;
  };
}

export interface Achievement {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  desbloqueado: boolean;
  fechaConseguido?: string;
  progreso?: {
    actual: number;
    total: number;
    unidad: string;
  };
}

export interface PlayerProfile {
  usuario: {
    id: string;
    nombreCompleto: string;
    email: string;
    telefono?: string;
    rangoActual: 'PLATINO' | 'ORO' | 'PLATA' | 'BRONCE' | 'COBRE';
    posicionJuego?: 'DRIVE' | 'REVES' | 'AMBIDIESTRO';
    club: {
      id: string;
      nombre: string;
    };
    imagenPerfil?: string;
  };
  estadisticas: PlayerStats;
  estadisticasHistoricas: PlayerHistoricalStats;
  historialPartidos: MatchHistory[];
  logros: Achievement[];
}

export interface PlayerSettings {
  notificaciones: {
    invitacionesPartidos: boolean;
    recordatoriosEventos: boolean;
    actualizacionesRanking: boolean;
    promocionesOfertas: boolean;
    notificacionesChat: boolean;
  };
  privacidad: {
    perfilVisible: 'todos' | 'club' | 'contactos';
    estadisticasVisibles: {
      ranking: boolean;
      historial: boolean;
      contacto: boolean;
    };
    mensajesDesde: 'todos' | 'club' | 'contactos';
  };
  preferencias: {
    idioma: string;
    zonaHoraria: string;
    formatoFecha: string;
  };
}
