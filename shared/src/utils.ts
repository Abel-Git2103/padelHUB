// Utilidades compartidas para validaciones y helpers
import { RangoNivel, TipoPartido, TipoTorneo } from './types';
import { 
  PUNTOS_MINIMOS_TORNEO, 
  PUNTOS_POR_RESULTADO, 
  UMBRALES_ASCENSO,
  UMBRALES_DEGRADACION,
  EQUIVALENCIAS_NIVEL 
} from './constants';

// Validaciones
export class Validaciones {
  static esEmailValido(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static esNombreValido(nombre: string): boolean {
    return nombre.length >= 2 && nombre.length <= 50;
  }

  static esRangoNivelValido(rango: string): rango is RangoNivel {
    return ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'].includes(rango);
  }

  static esTipoPartidoValido(tipo: string): tipo is TipoPartido {
    return ['igualado', 'no_igualado', 'amistoso'].includes(tipo);
  }

  static esTipoTorneoValido(tipo: string): tipo is TipoTorneo {
    return ['interno', 'interclubes', 'plataforma'].includes(tipo);
  }

  static tieneSuficientesPuntos(puntos: number, rango: RangoNivel): boolean {
    return puntos >= PUNTOS_MINIMOS_TORNEO[rango];
  }

  static cumpleRequisitosAscenso(puntos: number, winRate: number, rangoActual: RangoNivel): boolean {
    switch (rangoActual) {
      case 'COBRE':
        return puntos >= UMBRALES_ASCENSO.COBRE_TO_BRONCE.puntos && 
               winRate >= UMBRALES_ASCENSO.COBRE_TO_BRONCE.winRate;
      case 'BRONCE':
        return puntos >= UMBRALES_ASCENSO.BRONCE_TO_PLATA.puntos && 
               winRate >= UMBRALES_ASCENSO.BRONCE_TO_PLATA.winRate;
      case 'PLATA':
        return puntos >= UMBRALES_ASCENSO.PLATA_TO_ORO.puntos && 
               winRate >= UMBRALES_ASCENSO.PLATA_TO_ORO.winRate;
      case 'ORO':
        return puntos >= UMBRALES_ASCENSO.ORO_TO_PLATINO.puntos && 
               winRate >= UMBRALES_ASCENSO.ORO_TO_PLATINO.winRate;
      default:
        return false;
    }
  }

  static debeSerDegradado(puntos: number, rango: RangoNivel): boolean {
    // COBRE no puede degradar más
    if (rango === 'COBRE') return false;
    
    const umbralDegradacion = UMBRALES_DEGRADACION[rango];
    return umbralDegradacion !== undefined && puntos <= umbralDegradacion;
  }

  static esFechaFutura(fecha: Date): boolean {
    return fecha > new Date();
  }

  static esSaldoValido(saldo: number): boolean {
    return saldo >= 0 && saldo <= 10000;
  }

  static esNivelEquivalenteValido(nivel: number, rango: RangoNivel): boolean {
    const equivalencia = EQUIVALENCIAS_NIVEL[rango];
    return nivel >= equivalencia.min && nivel <= equivalencia.max;
  }
}

// Utilidades de cálculo
export class Calculos {
  static calcularPuntosPorResultado(resultado: 'victoria' | 'empate' | 'derrota'): number {
    return PUNTOS_POR_RESULTADO[resultado];
  }

  static calcularWinRate(victorias: number, empates: number, derrotas: number): number {
    const totalPartidos = victorias + empates + derrotas;
    if (totalPartidos === 0) return 0;
    return Math.round((victorias / totalPartidos) * 100);
  }

  static calcularPuntosParaSiguienteRango(rangoActual: RangoNivel, puntosActuales: number): number {
    switch (rangoActual) {
      case 'COBRE':
        return Math.max(0, UMBRALES_ASCENSO.COBRE_TO_BRONCE.puntos - puntosActuales);
      case 'BRONCE':
        return Math.max(0, UMBRALES_ASCENSO.BRONCE_TO_PLATA.puntos - puntosActuales);
      case 'PLATA':
        return Math.max(0, UMBRALES_ASCENSO.PLATA_TO_ORO.puntos - puntosActuales);
      case 'ORO':
        return Math.max(0, UMBRALES_ASCENSO.ORO_TO_PLATINO.puntos - puntosActuales);
      case 'PLATINO':
        return 0; // Ya está en el rango máximo
      default:
        return 0;
    }
  }

  static obtenerSiguienteRango(rangoActual: RangoNivel): RangoNivel | null {
    const rangos: RangoNivel[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const indiceActual = rangos.indexOf(rangoActual);
    
    if (indiceActual === -1 || indiceActual === rangos.length - 1) {
      return null; // Rango no válido o ya es el máximo
    }
    
    return rangos[indiceActual + 1];
  }

  static obtenerRangoAnterior(rangoActual: RangoNivel): RangoNivel | null {
    const rangos: RangoNivel[] = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
    const indiceActual = rangos.indexOf(rangoActual);
    
    if (indiceActual <= 0) {
      return null; // Ya es el mínimo o rango no válido
    }
    
    return rangos[indiceActual - 1];
  }

  static calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      return edad - 1;
    }
    
    return edad;
  }

  static calcularPuntosNecesariosParaTorneo(puntos: number, rango: RangoNivel): number {
    const puntosNecesarios = PUNTOS_MINIMOS_TORNEO[rango];
    return Math.max(0, puntosNecesarios - puntos);
  }

  static calcularTendenciaRanking(posicionActual: number, posicionAnterior: number): 'subiendo' | 'bajando' | 'estable' {
    if (posicionActual < posicionAnterior) return 'subiendo';
    if (posicionActual > posicionAnterior) return 'bajando';
    return 'estable';
  }

  static simularResultadosPartido(puntosJugador1: number, puntosJugador2: number): {
    jugador1: { puntos: number; cambio: number };
    jugador2: { puntos: number; cambio: number };
  } {
    // Victoria jugador 1
    return {
      jugador1: {
        puntos: puntosJugador1 + PUNTOS_POR_RESULTADO.victoria,
        cambio: PUNTOS_POR_RESULTADO.victoria
      },
      jugador2: {
        puntos: puntosJugador2 + PUNTOS_POR_RESULTADO.derrota,
        cambio: PUNTOS_POR_RESULTADO.derrota
      }
    };
  }
}

// Utilidades de formato
export class Formato {
  static formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  static formatearHora(fecha: Date): string {
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  static formatearMoneda(cantidad: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(cantidad);
  }

  static formatearPorcentaje(valor: number): string {
    return `${valor}%`;
  }

  static truncarTexto(texto: string, longitud: number): string {
    if (texto.length <= longitud) return texto;
    return texto.substring(0, longitud) + '...';
  }

  static formatearNombreRango(rango: RangoNivel): string {
    const nombres = {
      COBRE: 'Cobre - Principiante',
      BRONCE: 'Bronce - Amateur',
      PLATA: 'Plata - Intermedio',
      ORO: 'Oro - Avanzado',
      PLATINO: 'Platino - Élite'
    };
    return nombres[rango];
  }

  static formatearEmojiRango(rango: RangoNivel): string {
    const emojis = {
      COBRE: '🟫',
      BRONCE: '🥉',
      PLATA: '🥈',
      ORO: '🥇',
      PLATINO: '💎'
    };
    return emojis[rango];
  }

  static formatearEstadisticas(victorias: number, empates: number, derrotas: number): string {
    const total = victorias + empates + derrotas;
    if (total === 0) return 'Sin partidos jugados';
    
    const winRate = this.calcularWinRate(victorias, empates, derrotas);
    return `${victorias}V-${empates}E-${derrotas}D (${winRate}%)`;
  }

  private static calcularWinRate(victorias: number, empates: number, derrotas: number): number {
    const total = victorias + empates + derrotas;
    return Math.round((victorias / total) * 100);
  }

  static formatearTiempoRestante(fechaLimite: Date): string {
    const ahora = new Date();
    const diferencia = fechaLimite.getTime() - ahora.getTime();
    
    if (diferencia <= 0) return 'Expirado';
    
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    
    if (dias > 0) return `${dias}d ${horas}h`;
    if (horas > 0) return `${horas}h ${minutos}m`;
    return `${minutos}m`;
  }
}

// Utilidades de arrays y objetos
export class Utils {
  static ordenarPorPropiedad<T>(array: T[], propiedad: keyof T, ascendente = true): T[] {
    return array.sort((a, b) => {
      const valorA = a[propiedad];
      const valorB = b[propiedad];
      
      if (valorA < valorB) return ascendente ? -1 : 1;
      if (valorA > valorB) return ascendente ? 1 : -1;
      return 0;
    });
  }

  static agruparPor<T>(array: T[], propiedad: keyof T): Record<string, T[]> {
    return array.reduce((grupos, item) => {
      const clave = String(item[propiedad]);
      if (!grupos[clave]) {
        grupos[clave] = [];
      }
      grupos[clave].push(item);
      return grupos;
    }, {} as Record<string, T[]>);
  }

  static eliminarDuplicados<T>(array: T[], propiedad?: keyof T): T[] {
    if (!propiedad) {
      return [...new Set(array)];
    }
    
    const vistos = new Set();
    return array.filter(item => {
      const valor = item[propiedad];
      if (vistos.has(valor)) {
        return false;
      }
      vistos.add(valor);
      return true;
    });
  }

  static generarId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  static esperarTiempo(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static mezclarArray<T>(array: T[]): T[] {
    const resultado = [...array];
    for (let i = resultado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
  }

  static obtenerElementoAleatorio<T>(array: T[]): T | undefined {
    if (array.length === 0) return undefined;
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
  }

  static clampear(valor: number, min: number, max: number): number {
    return Math.min(Math.max(valor, min), max);
  }

  static redondear(numero: number, decimales: number = 2): number {
    const factor = Math.pow(10, decimales);
    return Math.round(numero * factor) / factor;
  }
}
