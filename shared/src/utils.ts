// Utilidades compartidas para validaciones y helpers
import { GrupoNivel, TipoPartido, TipoTorneo } from './types';
import { MINIMOS_VICTORIAS_POR_GRUPO, PUNTOS_POR_RESULTADO } from './constants';

// Validaciones
export class Validaciones {
  static esEmailValido(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static esNombreValido(nombre: string): boolean {
    return nombre.length >= 2 && nombre.length <= 50;
  }

  static esGrupoNivelValido(grupo: string): grupo is GrupoNivel {
    return ['A', 'B', 'C', 'D', 'E'].includes(grupo);
  }

  static esTipoPartidoValido(tipo: string): tipo is TipoPartido {
    return ['simple', 'interclubes'].includes(tipo);
  }

  static esTipoTorneoValido(tipo: string): tipo is TipoTorneo {
    return ['interno', 'interclubes'].includes(tipo);
  }

  static tieneSuficientesVictorias(victorias: number, grupo: GrupoNivel): boolean {
    return victorias >= MINIMOS_VICTORIAS_POR_GRUPO[grupo];
  }

  static esFechaFutura(fecha: Date): boolean {
    return fecha > new Date();
  }

  static esSaldoValido(saldo: number): boolean {
    return saldo >= 0 && saldo <= 10000;
  }
}

// Utilidades de cálculo
export class Calculos {
  static calcularPuntosPorResultado(resultado: 'victoria' | 'empate' | 'derrota'): number {
    return PUNTOS_POR_RESULTADO[resultado];
  }

  static calcularNuevaPosicionRanking(
    posicionActual: number,
    puntosGanados: number,
    rankings: Array<{ posicion: number; puntos: number }>
  ): number {
    // Lógica simplificada para calcular nueva posición
    // En implementación real sería más compleja
    return posicionActual;
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

  static calcularPorcentajeVictorias(victorias: number, totalPartidos: number): number {
    if (totalPartidos === 0) return 0;
    return Math.round((victorias / totalPartidos) * 100);
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

  static formatearNombreGrupo(grupo: GrupoNivel): string {
    const nombres = {
      A: 'Profesional',
      B: 'Avanzado',
      C: 'Intermedio',
      D: 'Principiante',
      E: 'Iniciación'
    };
    return `Grupo ${grupo} - ${nombres[grupo]}`;
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
}
