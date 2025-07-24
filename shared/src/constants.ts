// Constantes del dominio PadelHUB
export const GRUPOS_NIVEL = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'] as const;

export const PUNTOS_POR_RESULTADO = {
  victoria: 3,
  empate: 1,
  derrota: -3
} as const;

// Puntos mínimos para acceso a torneos por rango
export const PUNTOS_MINIMOS_TORNEO = {
  COBRE: 15,
  BRONCE: 30,
  PLATA: 50,
  ORO: 70,
  PLATINO: 90 // Solo por invitación
} as const;

// Puntos mínimos para mantener el rango
export const PUNTOS_MINIMOS_RANGO = {
  COBRE: 0,
  BRONCE: 20,
  PLATA: 35,
  ORO: 55,
  PLATINO: 90 // Solo por invitación
} as const;

// Umbrales de ascenso automático
export const UMBRALES_ASCENSO = {
  COBRE_TO_BRONCE: {
    puntos: 30,
    winRate: 40 // 40%
  },
  BRONCE_TO_PLATA: {
    puntos: 50,
    winRate: 50 // 50%
  },
  PLATA_TO_ORO: {
    puntos: 70,
    winRate: 60 // 60%
  },
  ORO_TO_PLATINO: {
    puntos: 90,
    winRate: 70, // 70%
    mesesEnOro: 6,
    partidosMensuales: 15,
    torneosGanados: 2
  }
} as const;

// Puntos de degradación (20% menos que el mínimo del rango)
export const UMBRALES_DEGRADACION = {
  COBRE: 0,   // COBRE no puede degradar más
  BRONCE: 16, // 20 - 20%
  PLATA: 28,  // 35 - 20%  
  ORO: 44,    // 55 - 20%
  PLATINO: 72 // 90 - 20%
} as const;

// Equivalencias de nivel tradicional
export const EQUIVALENCIAS_NIVEL = {
  COBRE: { min: 0, max: 0.9, descripcion: 'Principiante' },
  BRONCE: { min: 1.0, max: 1.9, descripcion: 'Jugador amateur' },
  PLATA: { min: 2.0, max: 3.9, descripcion: 'Jugador intermedio' },
  ORO: { min: 4.0, max: 5.9, descripcion: 'Jugador avanzado' },
  PLATINO: { min: 6.0, max: 7.0, descripcion: 'Jugador élite' }
} as const;

// Puntos iniciales al registrarse (mínimo del rango + 6 puntos)
export const PUNTOS_INICIALES_RANGO = {
  COBRE: 6,     // 0 + 6
  BRONCE: 26,   // 20 + 6
  PLATA: 41,    // 35 + 6
  ORO: 61,      // 55 + 6
  PLATINO: 96   // 90 + 6
} as const;

export const TEMPORADA_ACTUAL = '2024-2025';

export const FORMATO_FECHA = 'DD/MM/YYYY';
export const FORMATO_HORA = 'HH:mm';

export const LIMITES_SISTEMA = {
  MAX_JUGADORES_SIMULTANEOS: 10000,
  MAX_PARTICIPANTES_TORNEO: 64,
  MIN_PARTICIPANTES_TORNEO: 4,
  SALDO_MAXIMO_MONEDERO: 10000,
  RECARGA_MINIMA: 5,
  RECARGA_MAXIMA: 500,
  DURACION_TEMPORADA_MESES: 10, // Septiembre a Junio
  PARTIDOS_PROMEDIO_SEMANA: 2.5
} as const;

export const MENSAJES_ERROR = {
  USUARIO_NO_ENCONTRADO: 'Usuario no encontrado',
  CLUB_NO_ENCONTRADO: 'Club no encontrado',
  TORNEO_NO_ENCONTRADO: 'Torneo no encontrado',
  PARTIDO_NO_ENCONTRADO: 'Partido no encontrado',
  SIN_PERMISOS: 'No tienes permisos para realizar esta acción',
  SALDO_INSUFICIENTE: 'Saldo insuficiente en el monedero',
  INSCRIPCION_CERRADA: 'Las inscripciones para este torneo están cerradas',
  RANGO_INCORRECTO: 'No puedes participar en este rango de nivel',
  PUNTOS_INSUFICIENTES: 'No tienes suficientes puntos para participar',
  RANGO_DEGRADADO: 'Has sido degradado por puntos insuficientes'
} as const;

export const EVENTOS_TIEMPO_REAL = {
  NUEVO_PARTIDO: 'nuevo_partido',
  PARTIDO_ACTUALIZADO: 'partido_actualizado',
  NUEVO_TORNEO: 'nuevo_torneo',
  INSCRIPCION_TORNEO: 'inscripcion_torneo',
  RESULTADO_PARTIDO: 'resultado_partido',
  CAMBIO_RANKING: 'cambio_ranking',
  ASCENSO_RANGO: 'ascenso_rango',
  DEGRADACION_RANGO: 'degradacion_rango',
  NUEVA_NOTIFICACION: 'nueva_notificacion'
} as const;
