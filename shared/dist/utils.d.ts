import { RangoNivel, TipoPartido, TipoTorneo } from './types';
export declare class Validaciones {
    static esEmailValido(email: string): boolean;
    static esNombreValido(nombre: string): boolean;
    static esRangoNivelValido(rango: string): rango is RangoNivel;
    static esTipoPartidoValido(tipo: string): tipo is TipoPartido;
    static esTipoTorneoValido(tipo: string): tipo is TipoTorneo;
    static tieneSuficientesPuntos(puntos: number, rango: RangoNivel): boolean;
    static cumpleRequisitosAscenso(puntos: number, winRate: number, rangoActual: RangoNivel): boolean;
    static debeSerDegradado(puntos: number, rango: RangoNivel): boolean;
    static esFechaFutura(fecha: Date): boolean;
    static esSaldoValido(saldo: number): boolean;
    static esNivelEquivalenteValido(nivel: number, rango: RangoNivel): boolean;
}
export declare class Calculos {
    static calcularPuntosPorResultado(resultado: 'victoria' | 'empate' | 'derrota'): number;
    static calcularWinRate(victorias: number, empates: number, derrotas: number): number;
    static calcularPuntosParaSiguienteRango(rangoActual: RangoNivel, puntosActuales: number): number;
    static obtenerSiguienteRango(rangoActual: RangoNivel): RangoNivel | null;
    static obtenerRangoAnterior(rangoActual: RangoNivel): RangoNivel | null;
    static calcularEdad(fechaNacimiento: Date): number;
    static calcularPuntosNecesariosParaTorneo(puntos: number, rango: RangoNivel): number;
    static calcularTendenciaRanking(posicionActual: number, posicionAnterior: number): 'subiendo' | 'bajando' | 'estable';
    static simularResultadosPartido(puntosJugador1: number, puntosJugador2: number): {
        jugador1: {
            puntos: number;
            cambio: number;
        };
        jugador2: {
            puntos: number;
            cambio: number;
        };
    };
}
export declare class Formato {
    static formatearFecha(fecha: Date): string;
    static formatearHora(fecha: Date): string;
    static formatearMoneda(cantidad: number): string;
    static formatearPorcentaje(valor: number): string;
    static truncarTexto(texto: string, longitud: number): string;
    static formatearNombreRango(rango: RangoNivel): string;
    static formatearEmojiRango(rango: RangoNivel): string;
    static formatearEstadisticas(victorias: number, empates: number, derrotas: number): string;
    private static calcularWinRate;
    static formatearTiempoRestante(fechaLimite: Date): string;
}
export declare class Utils {
    static ordenarPorPropiedad<T>(array: T[], propiedad: keyof T, ascendente?: boolean): T[];
    static agruparPor<T>(array: T[], propiedad: keyof T): Record<string, T[]>;
    static eliminarDuplicados<T>(array: T[], propiedad?: keyof T): T[];
    static generarId(): string;
    static esperarTiempo(ms: number): Promise<void>;
    static mezclarArray<T>(array: T[]): T[];
    static obtenerElementoAleatorio<T>(array: T[]): T | undefined;
    static clampear(valor: number, min: number, max: number): number;
    static redondear(numero: number, decimales?: number): number;
}
//# sourceMappingURL=utils.d.ts.map