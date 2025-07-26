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

export const RANGOS_INFO: Record<TipoRango, RangoInfo> = {
  PLATINO: {
    tipo: 'PLATINO',
    icono: '💎',
    emblema: '💎',
    nombre: 'Platino',
    descripcion: 'Jugador élite',
    nivelEquivalente: '6.0 - 7.0',
    puntosMinimosTorneo: 'Solo invitación',
    puntosMinimos: 1000,
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
    puntosMinimos: 500,
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
    puntosMinimos: 200,
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
    puntosMinimos: 50,
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
    puntosMinimosTorneo: 15,
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
