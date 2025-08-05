import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { 
  TipoRango, 
  ProgresoRango, 
  calcularProgresoRango,
  obtenerConsejosProgreso 
} from '../models/rango.model';

export interface EstadisticasRanking {
  userId: string;
  rangoActual: TipoRango;
  puntos: number;
  partidosJugados: number;
  victorias: number;
  derrotas: number;
  empates: number;
  winRate: number;
  ultimaActualizacion: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  private apiUrl = '/api/ranking';
  private estadisticasSubject = new BehaviorSubject<EstadisticasRanking | null>(null);
  public estadisticas$ = this.estadisticasSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Obtiene las estadísticas de ranking del usuario
   */
  obtenerEstadisticasUsuario(userId: string): Observable<EstadisticasRanking> {
    return this.http.get<EstadisticasRanking>(`${this.apiUrl}/usuario/${userId}/estadisticas`);
  }

  /**
   * Calcula el progreso completo de un usuario hacia el siguiente rango
   */
  calcularProgresoCompleto(estadisticas: EstadisticasRanking): ProgresoRango {
    return calcularProgresoRango(
      estadisticas.rangoActual,
      estadisticas.puntos,
      estadisticas.winRate,
      estadisticas.partidosJugados,
      estadisticas.victorias
    );
  }

  /**
   * Obtiene consejos personalizados para el progreso del usuario
   */
  obtenerConsejosPersonalizados(estadisticas: EstadisticasRanking): string[] {
    const progreso = this.calcularProgresoCompleto(estadisticas);
    return obtenerConsejosProgreso(progreso);
  }

  /**
   * Verifica si el usuario puede ascender automáticamente
   */
  verificarAscensoAutomatico(userId: string): Observable<{ puedeAscender: boolean, nuevoRango?: TipoRango }> {
    return this.http.get<{ puedeAscender: boolean, nuevoRango?: TipoRango }>(`${this.apiUrl}/usuario/${userId}/verificar-ascenso`);
  }

  /**
   * Actualiza las estadísticas locales
   */
  actualizarEstadisticasLocales(estadisticas: EstadisticasRanking): void {
    this.estadisticasSubject.next(estadisticas);
  }

  /**
   * Datos de ejemplo para desarrollo/testing
   */
  obtenerDatosEjemplo(rangoActual: TipoRango = 'PLATA'): EstadisticasRanking {
    const ejemplos: Record<TipoRango, EstadisticasRanking> = {
      COBRE: {
        userId: 'ejemplo-1',
        rangoActual: 'COBRE',
        puntos: 18,
        partidosJugados: 39,
        victorias: 18,
        derrotas: 19,
        empates: 2,
        winRate: 46.2,
        ultimaActualizacion: new Date()
      },
      BRONCE: {
        userId: 'ejemplo-2',
        rangoActual: 'BRONCE',
        puntos: 47,
        partidosJugados: 94,
        victorias: 45,
        derrotas: 47,
        empates: 2,
        winRate: 47.9,
        ultimaActualizacion: new Date()
      },
      PLATA: {
        userId: 'ejemplo-3',
        rangoActual: 'PLATA',
        puntos: 62,
        partidosJugados: 89,
        victorias: 61,
        derrotas: 26,
        empates: 2,
        winRate: 68.5,
        ultimaActualizacion: new Date()
      },
      ORO: {
        userId: 'ejemplo-4',
        rangoActual: 'ORO',
        puntos: 87,
        partidosJugados: 124,
        victorias: 90,
        derrotas: 32,
        empates: 2,
        winRate: 72.6,
        ultimaActualizacion: new Date()
      },
      PLATINO: {
        userId: 'ejemplo-5',
        rangoActual: 'PLATINO',
        puntos: 96,
        partidosJugados: 140,
        victorias: 105,
        derrotas: 33,
        empates: 2,
        winRate: 75.0,
        ultimaActualizacion: new Date()
      }
    };

    return ejemplos[rangoActual];
  }

  /**
   * Simula estadísticas realistas basadas en el progreso actual
   */
  simularEstadisticasRealisticas(
    rangoActual: TipoRango, 
    progresoHaciaProximo: number = 70 // Porcentaje hacia el próximo rango
  ): EstadisticasRanking {
    const ejemploBase = this.obtenerDatosEjemplo(rangoActual);
    
    // Ajustar puntos según el progreso
    const rangosUmbrales = {
      COBRE: { actual: 0, proximo: 30 },
      BRONCE: { actual: 20, proximo: 50 },
      PLATA: { actual: 35, proximo: 70 },
      ORO: { actual: 55, proximo: 90 },
      PLATINO: { actual: 90, proximo: 90 }
    };

    const umbral = rangosUmbrales[rangoActual];
    const puntosPorProgreso = umbral.actual + ((umbral.proximo - umbral.actual) * progresoHaciaProximo / 100);
    
    // Simular estadísticas coherentes con los puntos
    const partidosEstimados = Math.floor(puntosPorProgreso * 1.4); // Aprox 1.4 partidos por punto
    const victoriasEstimadas = Math.floor(partidosEstimados * 0.6); // 60% win rate promedio
    const derrotasEstimadas = partidosEstimados - victoriasEstimadas;
    
    return {
      ...ejemploBase,
      puntos: Math.round(puntosPorProgreso),
      partidosJugados: partidosEstimados,
      victorias: victoriasEstimadas,
      derrotas: derrotasEstimadas,
      winRate: (victoriasEstimadas / partidosEstimados) * 100,
      ultimaActualizacion: new Date()
    };
  }
}
