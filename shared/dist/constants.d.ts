export declare const GRUPOS_NIVEL: readonly ["COBRE", "BRONCE", "PLATA", "ORO", "PLATINO"];
export declare const PUNTOS_POR_RESULTADO: {
    readonly victoria: 3;
    readonly empate: 1;
    readonly derrota: -3;
};
export declare const PUNTOS_MINIMOS_TORNEO: {
    readonly COBRE: 15;
    readonly BRONCE: 30;
    readonly PLATA: 50;
    readonly ORO: 70;
    readonly PLATINO: 90;
};
export declare const PUNTOS_MINIMOS_RANGO: {
    readonly COBRE: 0;
    readonly BRONCE: 20;
    readonly PLATA: 35;
    readonly ORO: 55;
    readonly PLATINO: 90;
};
export declare const UMBRALES_ASCENSO: {
    readonly COBRE_TO_BRONCE: {
        readonly puntos: 30;
        readonly winRate: 40;
    };
    readonly BRONCE_TO_PLATA: {
        readonly puntos: 50;
        readonly winRate: 50;
    };
    readonly PLATA_TO_ORO: {
        readonly puntos: 70;
        readonly winRate: 60;
    };
    readonly ORO_TO_PLATINO: {
        readonly puntos: 90;
        readonly winRate: 70;
        readonly mesesEnOro: 6;
        readonly partidosMensuales: 15;
        readonly torneosGanados: 2;
    };
};
export declare const UMBRALES_DEGRADACION: {
    readonly COBRE: 0;
    readonly BRONCE: 16;
    readonly PLATA: 28;
    readonly ORO: 44;
    readonly PLATINO: 72;
};
export declare const EQUIVALENCIAS_NIVEL: {
    readonly COBRE: {
        readonly min: 0;
        readonly max: 0.9;
        readonly descripcion: "Principiante";
    };
    readonly BRONCE: {
        readonly min: 1;
        readonly max: 1.9;
        readonly descripcion: "Jugador amateur";
    };
    readonly PLATA: {
        readonly min: 2;
        readonly max: 3.9;
        readonly descripcion: "Jugador intermedio";
    };
    readonly ORO: {
        readonly min: 4;
        readonly max: 5.9;
        readonly descripcion: "Jugador avanzado";
    };
    readonly PLATINO: {
        readonly min: 6;
        readonly max: 7;
        readonly descripcion: "Jugador élite";
    };
};
export declare const PUNTOS_INICIALES_RANGO: {
    readonly COBRE: 6;
    readonly BRONCE: 26;
    readonly PLATA: 41;
    readonly ORO: 61;
    readonly PLATINO: 96;
};
export declare const TEMPORADA_ACTUAL = "2024-2025";
export declare const FORMATO_FECHA = "DD/MM/YYYY";
export declare const FORMATO_HORA = "HH:mm";
export declare const LIMITES_SISTEMA: {
    readonly MAX_JUGADORES_SIMULTANEOS: 10000;
    readonly MAX_PARTICIPANTES_TORNEO: 64;
    readonly MIN_PARTICIPANTES_TORNEO: 4;
    readonly SALDO_MAXIMO_MONEDERO: 10000;
    readonly RECARGA_MINIMA: 5;
    readonly RECARGA_MAXIMA: 500;
    readonly DURACION_TEMPORADA_MESES: 10;
    readonly PARTIDOS_PROMEDIO_SEMANA: 2.5;
};
export declare const MENSAJES_ERROR: {
    readonly USUARIO_NO_ENCONTRADO: "Usuario no encontrado";
    readonly CLUB_NO_ENCONTRADO: "Club no encontrado";
    readonly TORNEO_NO_ENCONTRADO: "Torneo no encontrado";
    readonly PARTIDO_NO_ENCONTRADO: "Partido no encontrado";
    readonly SIN_PERMISOS: "No tienes permisos para realizar esta acción";
    readonly SALDO_INSUFICIENTE: "Saldo insuficiente en el monedero";
    readonly INSCRIPCION_CERRADA: "Las inscripciones para este torneo están cerradas";
    readonly RANGO_INCORRECTO: "No puedes participar en este rango de nivel";
    readonly PUNTOS_INSUFICIENTES: "No tienes suficientes puntos para participar";
    readonly RANGO_DEGRADADO: "Has sido degradado por puntos insuficientes";
};
export declare const EVENTOS_TIEMPO_REAL: {
    readonly NUEVO_PARTIDO: "nuevo_partido";
    readonly PARTIDO_ACTUALIZADO: "partido_actualizado";
    readonly NUEVO_TORNEO: "nuevo_torneo";
    readonly INSCRIPCION_TORNEO: "inscripcion_torneo";
    readonly RESULTADO_PARTIDO: "resultado_partido";
    readonly CAMBIO_RANKING: "cambio_ranking";
    readonly ASCENSO_RANGO: "ascenso_rango";
    readonly DEGRADACION_RANGO: "degradacion_rango";
    readonly NUEVA_NOTIFICACION: "nueva_notificacion";
};
//# sourceMappingURL=constants.d.ts.map