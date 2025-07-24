/**
 * Enums y constantes compartidas para PadelHUB Backend
 */

/**
 * Sistema de Rangos por Metales
 * Basado en la documentación del sistema de niveles
 */
export enum RangoUsuario {
  COBRE = 'COBRE',     // 0-0.9 pts   - Principiante - 15 pts mín torneo
  BRONCE = 'BRONCE',   // 1.0-1.9 pts - Amateur     - 30 pts mín torneo  
  PLATA = 'PLATA',     // 2.0-3.9 pts - Intermedio  - 50 pts mín torneo
  ORO = 'ORO',         // 4.0-5.9 pts - Avanzado    - 70 pts mín torneo
  PLATINO = 'PLATINO'  // 6.0+ pts    - Élite       - Solo invitación
}

/**
 * Información detallada de cada rango
 */
export const INFO_RANGOS = {
  [RangoUsuario.COBRE]: {
    nombre: 'Cobre',
    emoji: '🟫',
    nivel: '0 - 0.9',
    descripcion: 'Principiante',
    puntosMinTorneo: 15,
    rangosPuntos: { min: 0, max: 0.9 }
  },
  [RangoUsuario.BRONCE]: {
    nombre: 'Bronce', 
    emoji: '🥉',
    nivel: '1.0 - 1.9',
    descripcion: 'Amateur',
    puntosMinTorneo: 30,
    rangosPuntos: { min: 1.0, max: 1.9 }
  },
  [RangoUsuario.PLATA]: {
    nombre: 'Plata',
    emoji: '🥈', 
    nivel: '2.0 - 3.9',
    descripcion: 'Intermedio',
    puntosMinTorneo: 50,
    rangosPuntos: { min: 2.0, max: 3.9 }
  },
  [RangoUsuario.ORO]: {
    nombre: 'Oro',
    emoji: '🥇',
    nivel: '4.0 - 5.9', 
    descripcion: 'Avanzado',
    puntosMinTorneo: 70,
    rangosPuntos: { min: 4.0, max: 5.9 }
  },
  [RangoUsuario.PLATINO]: {
    nombre: 'Platino',
    emoji: '💎',
    nivel: '6.0+',
    descripcion: 'Élite',
    puntosMinTorneo: null, // Solo por invitación
    rangosPuntos: { min: 6.0, max: null }
  }
};

/**
 * Roles del sistema
 */
export enum RolUsuario {
  JUGADOR = 'JUGADOR',
  ADMIN_CLUB = 'ADMIN_CLUB', 
  ADMIN_SISTEMA = 'ADMIN_SISTEMA'
}

/**
 * Tipos de partidos según documentación
 */
export enum TipoPartido {
  IGUALADO = 'IGUALADO',         // Mismo rango → Siempre puntúa
  NO_IGUALADO = 'NO_IGUALADO',   // Mixto → Puntúa si condiciones se cumplen
  AMISTOSO = 'AMISTOSO'          // Con jugadores de rango inferior → No puntúa
}

/**
 * Estados de los partidos
 */
export enum EstadoPartido {
  PENDIENTE = 'PENDIENTE',
  EN_PROGRESO = 'EN_PROGRESO', 
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO'
}

/**
 * Sistema de puntuación de partidos
 */
export const PUNTOS_PARTIDO = {
  VICTORIA: 3,    // Victoria
  DERROTA: -3,    // Derrota
  EMPATE: 1       // Empate (si aplica)
};

/**
 * Estados de los clubes
 */
export enum EstadoClub {
  ACTIVO = 'ACTIVO',
  INACTIVO = 'INACTIVO',
  SUSPENDIDO = 'SUSPENDIDO'
}

/**
 * Temporadas del sistema (Sept - Mayo)
 */
export interface Temporada {
  año: number;
  fechaInicio: Date;
  fechaFin: Date;
  esActiva: boolean;
}

/**
 * Configuración de la temporada actual
 */
export const TEMPORADA_ACTUAL = {
  año: 2025,
  fechaInicio: new Date('2024-09-01'),
  fechaFin: new Date('2025-05-31'),
  esActiva: true
};
