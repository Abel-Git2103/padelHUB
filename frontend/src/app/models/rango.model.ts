export type TipoRango = 'PLATINO' | 'ORO' | 'PLATA' | 'BRONCE' | 'COBRE';
export type RangoMetal = TipoRango; // Alias para compatibilidad

export interface RangoInfo {
  tipo: TipoRango;
  icono: string;
  nombre: string;
  descripcion: string;
  nivelEquivalente: string;
  puntosMinimosTorneo: number | string;
  puntosMinimos: number;
  color: string;
  colorFondo: string;
  emblema: string;
}

// Nuevos interfaces para el sistema de progreso
export interface UmbralesAscenso {
  puntosRequeridos: number;
  winRateRequerido: number;
  siguienteRango: TipoRango | null;
}

export interface ProgresoRango {
  rangoActual: TipoRango;
  puntos: number;
  winRate: number;
  puntosProximoRango: number;
  winRateRequerido: number;
  progresoTotal: number; // Porcentaje 0-100
  progresoPuntos: number; // Porcentaje 0-100
  progresoWinRate: number; // Porcentaje 0-100
  puedeAscender: boolean;
  victoriasNecesarias: number;
  margenSeguridad: number; // Puntos sobre el umbral de degradación
  enZonaPeligro: boolean;
}

// Umbrales de ascenso según nueva documentación
export const UMBRALES_ASCENSO: Record<TipoRango, UmbralesAscenso> = {
  COBRE: {
    puntosRequeridos: 30,
    winRateRequerido: 40,
    siguienteRango: 'BRONCE'
  },
  BRONCE: {
    puntosRequeridos: 50,
    winRateRequerido: 50,
    siguienteRango: 'PLATA'
  },
  PLATA: {
    puntosRequeridos: 70,
    winRateRequerido: 60,
    siguienteRango: 'ORO'
  },
  ORO: {
    puntosRequeridos: 90,
    winRateRequerido: 70,
    siguienteRango: 'PLATINO'
  },
  PLATINO: {
    puntosRequeridos: 0, // No hay ascenso desde PLATINO
    winRateRequerido: 0,
    siguienteRango: null
  }
};

export const RANGOS_INFO: Record<TipoRango, RangoInfo> = {
  PLATINO: {
    tipo: 'PLATINO',
    icono: '💎',
    emblema: '💎',
    nombre: 'Platino',
    descripcion: 'Jugador élite',
    nivelEquivalente: '6.0 - 7.0',
    puntosMinimosTorneo: 'Solo invitación',
    puntosMinimos: 90, // Actualizado según nuevos umbrales
    color: '#E5E4E2',
    colorFondo: '#F8F8FF'
  },
  ORO: {
    tipo: 'ORO',
    icono: '🥇',
    emblema: '🥇',
    nombre: 'Oro',
    descripcion: 'Jugador avanzado',
    nivelEquivalente: '4.0 - 5.9',
    puntosMinimosTorneo: 70,
    puntosMinimos: 55, // Actualizado según nuevos umbrales
    color: '#FFD700',
    colorFondo: '#FFFAF0'
  },
  PLATA: {
    tipo: 'PLATA',
    icono: '🥈',
    emblema: '🥈',
    nombre: 'Plata',
    descripcion: 'Jugador intermedio',
    nivelEquivalente: '2.0 - 3.9',
    puntosMinimosTorneo: 50,
    puntosMinimos: 35, // Actualizado según nuevos umbrales
    color: '#C0C0C0',
    colorFondo: '#F5F5F5'
  },
  BRONCE: {
    tipo: 'BRONCE',
    icono: '🥉',
    emblema: '🥉',
    nombre: 'Bronce',
    descripcion: 'Jugador amateur',
    nivelEquivalente: '1.0 - 1.9',
    puntosMinimosTorneo: 30,
    puntosMinimos: 20, // Actualizado según nuevos umbrales
    color: '#CD7F32',
    colorFondo: '#FFF8DC'
  },
  COBRE: {
    tipo: 'COBRE',
    icono: '🟫',
    emblema: '🟫',
    nombre: 'Cobre',
    descripcion: 'Principiante',
    nivelEquivalente: '0 - 0.9',
    puntosMinimosTorneo: 0,
    puntosMinimos: 0,
    color: '#B87333',
    colorFondo: '#FDF5E6'
  }
};

export function obtenerInfoRango(rango: TipoRango): RangoInfo {
  return RANGOS_INFO[rango];
}

export function obtenerTodosLosRangos(): RangoInfo[] {
  return Object.values(RANGOS_INFO);
}

// Nuevas funciones para el sistema de progreso
export function calcularProgresoRango(
  rangoActual: TipoRango, 
  puntos: number, 
  winRate: number,
  partidosJugados: number,
  victorias: number
): ProgresoRango {
  const umbral = UMBRALES_ASCENSO[rangoActual];
  const rangoInfo = RANGOS_INFO[rangoActual];
  
  // Calcular progreso hacia siguiente rango
  const progresoPuntos = umbral.siguienteRango 
    ? Math.min((puntos / umbral.puntosRequeridos) * 100, 100)
    : 100;
  
  const progresoWinRate = umbral.siguienteRango
    ? Math.min((winRate / umbral.winRateRequerido) * 100, 100)
    : 100;
  
  // Progreso total (ambos criterios deben cumplirse)
  const progresoTotal = umbral.siguienteRango
    ? Math.min(progresoPuntos, progresoWinRate)
    : 100;
  
  // ¿Puede ascender?
  const puedeAscender = umbral.siguienteRango
    ? puntos >= umbral.puntosRequeridos && winRate >= umbral.winRateRequerido
    : false;
  
  // Victorias necesarias para ascender
  const puntosNecesarios = Math.max(0, umbral.puntosRequeridos - puntos);
  const victoriasNecesarias = Math.ceil(puntosNecesarios / 3); // Asumiendo +3 por victoria
  
  // Margen de seguridad (6 puntos sobre el mínimo para degradación)
  const margenSeguridad = puntos - (rangoInfo.puntosMinimos - 6);
  const enZonaPeligro = margenSeguridad <= 5 && rangoActual !== 'COBRE'; // COBRE no puede degradar
  
  return {
    rangoActual,
    puntos,
    winRate,
    puntosProximoRango: umbral.puntosRequeridos,
    winRateRequerido: umbral.winRateRequerido,
    progresoTotal,
    progresoPuntos,
    progresoWinRate,
    puedeAscender,
    victoriasNecesarias,
    margenSeguridad,
    enZonaPeligro
  };
}

export function obtenerConsejosProgreso(progreso: ProgresoRango): string[] {
  const consejos: string[] = [];
  const { rangoActual, puntos, winRate, puedeAscender, victoriasNecesarias, enZonaPeligro } = progreso;
  const umbral = UMBRALES_ASCENSO[rangoActual];
  
  if (puedeAscender) {
    consejos.push('¡Felicidades! Cumples todos los requisitos para ascender.');
    consejos.push('El ascenso será automático en la próxima actualización del sistema.');
  } else if (umbral.siguienteRango) {
    if (puntos < umbral.puntosRequeridos && winRate < umbral.winRateRequerido) {
      consejos.push(`Necesitas ${umbral.puntosRequeridos - puntos} puntos más y mejorar tu WinRate al ${umbral.winRateRequerido}%.`);
      consejos.push(`Enfócate en ganar partidos: necesitas ~${victoriasNecesarias} victorias más.`);
    } else if (puntos < umbral.puntosRequeridos) {
      consejos.push(`Tienes excelente WinRate! Solo necesitas ${umbral.puntosRequeridos - puntos} puntos más.`);
      consejos.push(`Con tu nivel actual, necesitas ~${victoriasNecesarias} victorias más.`);
    } else if (winRate < umbral.winRateRequerido) {
      consejos.push(`Tienes suficientes puntos, pero necesitas mejorar tu WinRate al ${umbral.winRateRequerido}%.`);
      consejos.push('Enfócate en partidos que puedas ganar para mejorar tu ratio.');
    }
    
    // Consejo sobre torneos
    if (puntos >= RANGOS_INFO[rangoActual].puntosMinimos) {
      consejos.push(`💡 Alternativa rápida: Participa en el torneo ${rangoActual} para ascenso directo.`);
    }
  }
  
  if (enZonaPeligro) {
    consejos.push('⚠️ Estás en zona de peligro. Gana tu próximo partido para mayor seguridad.');
  }
  
  return consejos;
}

export function generarLineaProgresoVisual(progreso: ProgresoRango): string {
  const rangos: TipoRango[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
  const iconos = ['🟫', '🥉', '🥈', '🥇', '💎'];
  const umbrales = [0, 30, 50, 70, 90];
  
  const currentIndex = rangos.indexOf(progreso.rangoActual);
  
  let linea = '';
  for (let i = 0; i < rangos.length; i++) {
    if (i === currentIndex) {
      linea += `${iconos[i]} ${progreso.puntos}pts ⬤`;
    } else if (i < currentIndex) {
      linea += `${iconos[i]} ✅`;
    } else {
      linea += `${iconos[i]} ${umbrales[i]}pts`;
    }
    
    if (i < rangos.length - 1) {
      linea += ' ──── ';
    }
  }
  
  return linea;
}
