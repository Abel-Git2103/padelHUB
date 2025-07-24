// Constantes del dominio PadelHUB
export const GRUPOS_NIVEL = ['A', 'B', 'C', 'D', 'E'] as const;

export const PUNTOS_POR_RESULTADO = {
  victoria: 3,
  empate: 1,
  derrota: 0
} as const;

export const MINIMOS_VICTORIAS_POR_GRUPO = {
  A: 15,
  B: 12,
  C: 10,
  D: 8,
  E: 5
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
  RECARGA_MAXIMA: 500
} as const;

export const MENSAJES_ERROR = {
  USUARIO_NO_ENCONTRADO: 'Usuario no encontrado',
  CLUB_NO_ENCONTRADO: 'Club no encontrado',
  TORNEO_NO_ENCONTRADO: 'Torneo no encontrado',
  PARTIDO_NO_ENCONTRADO: 'Partido no encontrado',
  SIN_PERMISOS: 'No tienes permisos para realizar esta acción',
  SALDO_INSUFICIENTE: 'Saldo insuficiente en el monedero',
  INSCRIPCION_CERRADA: 'Las inscripciones para este torneo están cerradas',
  GRUPO_INCORRECTO: 'No puedes participar en este grupo de nivel',
  VICTORIAS_INSUFICIENTES: 'No tienes suficientes victorias para participar'
} as const;

export const EVENTOS_TIEMPO_REAL = {
  NUEVO_PARTIDO: 'nuevo_partido',
  PARTIDO_ACTUALIZADO: 'partido_actualizado',
  NUEVO_TORNEO: 'nuevo_torneo',
  INSCRIPCION_TORNEO: 'inscripcion_torneo',
  RESULTADO_PARTIDO: 'resultado_partido',
  CAMBIO_RANKING: 'cambio_ranking',
  NUEVA_NOTIFICACION: 'nueva_notificacion'
} as const;
