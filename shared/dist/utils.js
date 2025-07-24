"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = exports.Formato = exports.Calculos = exports.Validaciones = void 0;
const constants_1 = require("./constants");
// Validaciones
class Validaciones {
    static esEmailValido(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static esNombreValido(nombre) {
        return nombre.length >= 2 && nombre.length <= 50;
    }
    static esRangoNivelValido(rango) {
        return ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'].includes(rango);
    }
    static esTipoPartidoValido(tipo) {
        return ['igualado', 'no_igualado', 'amistoso'].includes(tipo);
    }
    static esTipoTorneoValido(tipo) {
        return ['interno', 'interclubes', 'plataforma'].includes(tipo);
    }
    static tieneSuficientesPuntos(puntos, rango) {
        return puntos >= constants_1.PUNTOS_MINIMOS_TORNEO[rango];
    }
    static cumpleRequisitosAscenso(puntos, winRate, rangoActual) {
        switch (rangoActual) {
            case 'COBRE':
                return puntos >= constants_1.UMBRALES_ASCENSO.COBRE_TO_BRONCE.puntos &&
                    winRate >= constants_1.UMBRALES_ASCENSO.COBRE_TO_BRONCE.winRate;
            case 'BRONCE':
                return puntos >= constants_1.UMBRALES_ASCENSO.BRONCE_TO_PLATA.puntos &&
                    winRate >= constants_1.UMBRALES_ASCENSO.BRONCE_TO_PLATA.winRate;
            case 'PLATA':
                return puntos >= constants_1.UMBRALES_ASCENSO.PLATA_TO_ORO.puntos &&
                    winRate >= constants_1.UMBRALES_ASCENSO.PLATA_TO_ORO.winRate;
            case 'ORO':
                return puntos >= constants_1.UMBRALES_ASCENSO.ORO_TO_PLATINO.puntos &&
                    winRate >= constants_1.UMBRALES_ASCENSO.ORO_TO_PLATINO.winRate;
            default:
                return false;
        }
    }
    static debeSerDegradado(puntos, rango) {
        // COBRE no puede degradar más
        if (rango === 'COBRE')
            return false;
        const umbralDegradacion = constants_1.UMBRALES_DEGRADACION[rango];
        return umbralDegradacion !== undefined && puntos <= umbralDegradacion;
    }
    static esFechaFutura(fecha) {
        return fecha > new Date();
    }
    static esSaldoValido(saldo) {
        return saldo >= 0 && saldo <= 10000;
    }
    static esNivelEquivalenteValido(nivel, rango) {
        const equivalencia = constants_1.EQUIVALENCIAS_NIVEL[rango];
        return nivel >= equivalencia.min && nivel <= equivalencia.max;
    }
}
exports.Validaciones = Validaciones;
// Utilidades de cálculo
class Calculos {
    static calcularPuntosPorResultado(resultado) {
        return constants_1.PUNTOS_POR_RESULTADO[resultado];
    }
    static calcularWinRate(victorias, empates, derrotas) {
        const totalPartidos = victorias + empates + derrotas;
        if (totalPartidos === 0)
            return 0;
        return Math.round((victorias / totalPartidos) * 100);
    }
    static calcularPuntosParaSiguienteRango(rangoActual, puntosActuales) {
        switch (rangoActual) {
            case 'COBRE':
                return Math.max(0, constants_1.UMBRALES_ASCENSO.COBRE_TO_BRONCE.puntos - puntosActuales);
            case 'BRONCE':
                return Math.max(0, constants_1.UMBRALES_ASCENSO.BRONCE_TO_PLATA.puntos - puntosActuales);
            case 'PLATA':
                return Math.max(0, constants_1.UMBRALES_ASCENSO.PLATA_TO_ORO.puntos - puntosActuales);
            case 'ORO':
                return Math.max(0, constants_1.UMBRALES_ASCENSO.ORO_TO_PLATINO.puntos - puntosActuales);
            case 'PLATINO':
                return 0; // Ya está en el rango máximo
            default:
                return 0;
        }
    }
    static obtenerSiguienteRango(rangoActual) {
        const rangos = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
        const indiceActual = rangos.indexOf(rangoActual);
        if (indiceActual === -1 || indiceActual === rangos.length - 1) {
            return null; // Rango no válido o ya es el máximo
        }
        return rangos[indiceActual + 1];
    }
    static obtenerRangoAnterior(rangoActual) {
        const rangos = ['COBRE', 'BRONCE', 'PLATA', 'ORO', 'PLATINO'];
        const indiceActual = rangos.indexOf(rangoActual);
        if (indiceActual <= 0) {
            return null; // Ya es el mínimo o rango no válido
        }
        return rangos[indiceActual - 1];
    }
    static calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mes = hoy.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            return edad - 1;
        }
        return edad;
    }
    static calcularPuntosNecesariosParaTorneo(puntos, rango) {
        const puntosNecesarios = constants_1.PUNTOS_MINIMOS_TORNEO[rango];
        return Math.max(0, puntosNecesarios - puntos);
    }
    static calcularTendenciaRanking(posicionActual, posicionAnterior) {
        if (posicionActual < posicionAnterior)
            return 'subiendo';
        if (posicionActual > posicionAnterior)
            return 'bajando';
        return 'estable';
    }
    static simularResultadosPartido(puntosJugador1, puntosJugador2) {
        // Victoria jugador 1
        return {
            jugador1: {
                puntos: puntosJugador1 + constants_1.PUNTOS_POR_RESULTADO.victoria,
                cambio: constants_1.PUNTOS_POR_RESULTADO.victoria
            },
            jugador2: {
                puntos: puntosJugador2 + constants_1.PUNTOS_POR_RESULTADO.derrota,
                cambio: constants_1.PUNTOS_POR_RESULTADO.derrota
            }
        };
    }
}
exports.Calculos = Calculos;
// Utilidades de formato
class Formato {
    static formatearFecha(fecha) {
        return fecha.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }
    static formatearHora(fecha) {
        return fecha.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    static formatearMoneda(cantidad) {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(cantidad);
    }
    static formatearPorcentaje(valor) {
        return `${valor}%`;
    }
    static truncarTexto(texto, longitud) {
        if (texto.length <= longitud)
            return texto;
        return texto.substring(0, longitud) + '...';
    }
    static formatearNombreRango(rango) {
        const nombres = {
            COBRE: 'Cobre - Principiante',
            BRONCE: 'Bronce - Amateur',
            PLATA: 'Plata - Intermedio',
            ORO: 'Oro - Avanzado',
            PLATINO: 'Platino - Élite'
        };
        return nombres[rango];
    }
    static formatearEmojiRango(rango) {
        const emojis = {
            COBRE: '🟫',
            BRONCE: '🥉',
            PLATA: '🥈',
            ORO: '🥇',
            PLATINO: '💎'
        };
        return emojis[rango];
    }
    static formatearEstadisticas(victorias, empates, derrotas) {
        const total = victorias + empates + derrotas;
        if (total === 0)
            return 'Sin partidos jugados';
        const winRate = this.calcularWinRate(victorias, empates, derrotas);
        return `${victorias}V-${empates}E-${derrotas}D (${winRate}%)`;
    }
    static calcularWinRate(victorias, empates, derrotas) {
        const total = victorias + empates + derrotas;
        return Math.round((victorias / total) * 100);
    }
    static formatearTiempoRestante(fechaLimite) {
        const ahora = new Date();
        const diferencia = fechaLimite.getTime() - ahora.getTime();
        if (diferencia <= 0)
            return 'Expirado';
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        if (dias > 0)
            return `${dias}d ${horas}h`;
        if (horas > 0)
            return `${horas}h ${minutos}m`;
        return `${minutos}m`;
    }
}
exports.Formato = Formato;
// Utilidades de arrays y objetos
class Utils {
    static ordenarPorPropiedad(array, propiedad, ascendente = true) {
        return array.sort((a, b) => {
            const valorA = a[propiedad];
            const valorB = b[propiedad];
            if (valorA < valorB)
                return ascendente ? -1 : 1;
            if (valorA > valorB)
                return ascendente ? 1 : -1;
            return 0;
        });
    }
    static agruparPor(array, propiedad) {
        return array.reduce((grupos, item) => {
            const clave = String(item[propiedad]);
            if (!grupos[clave]) {
                grupos[clave] = [];
            }
            grupos[clave].push(item);
            return grupos;
        }, {});
    }
    static eliminarDuplicados(array, propiedad) {
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
    static generarId() {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
    static esperarTiempo(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static mezclarArray(array) {
        const resultado = [...array];
        for (let i = resultado.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
        }
        return resultado;
    }
    static obtenerElementoAleatorio(array) {
        if (array.length === 0)
            return undefined;
        const indiceAleatorio = Math.floor(Math.random() * array.length);
        return array[indiceAleatorio];
    }
    static clampear(valor, min, max) {
        return Math.min(Math.max(valor, min), max);
    }
    static redondear(numero, decimales = 2) {
        const factor = Math.pow(10, decimales);
        return Math.round(numero * factor) / factor;
    }
}
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map