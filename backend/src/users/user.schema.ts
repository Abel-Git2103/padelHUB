import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RangoUsuario, RolUsuario, TEMPORADA_ACTUAL } from '../common/enums';

export type DocumentoUsuario = Usuario & Document & {
  nombreCompleto: string;
  obtenerEstadisticasTemporadaActual(): EstadisticasUsuario | null;
  inicializarEstadisticasTemporadaActual(): EstadisticasUsuario;
};

/**
 * Estadísticas del usuario por temporada
 */
@Schema({ _id: false })
export class EstadisticasUsuario {
  @Prop({ required: true })
  temporada: number;

  @Prop({ default: 0 })
  puntosActuales: number;

  @Prop({ default: 0 })
  partidosJugados: number;

  @Prop({ default: 0 })
  partidosGanados: number;

  @Prop({ default: 0 })
  partidosPerdidos: number;

  @Prop({ default: 0 })
  torneosGanados: number;

  @Prop({ default: 0 })
  torneosJugados: number;

  // Ranking dentro del club
  @Prop({ default: null })
  posicionRankingClub: number;

  // Ranking nacional
  @Prop({ default: null })
  posicionRankingNacional: number;
}

const EsquemaEstadisticasUsuario = SchemaFactory.createForClass(EstadisticasUsuario);

/**
 * Configuración de privacidad del usuario
 */
@Schema({ _id: false })
export class ConfiguracionPrivacidad {
  @Prop({ default: true })
  mostrarEmail: boolean;

  @Prop({ default: true })
  mostrarTelefono: boolean;

  @Prop({ default: true })
  mostrarEstadisticas: boolean;

  @Prop({ default: false })
  mostrarUbicacion: boolean;
}

const EsquemaConfiguracionPrivacidad = SchemaFactory.createForClass(ConfiguracionPrivacidad);

/**
 * Modelo principal del Usuario
 */
@Schema({ 
  timestamps: true,
  collection: 'usuarios'
})
export class Usuario {
  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  contraseña: string;

  // Campo alternativo para compatibilidad
  @Prop({ required: false })
  password?: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellidos: string;

  @Prop({ required: false })
  telefono?: string;

  @Prop({ required: false })
  imagenPerfil?: string;

  @Prop({ required: false })
  fechaNacimiento?: Date;

  @Prop({ required: false })
  ubicacion?: string;

  // Sistema de rangos
  @Prop({ 
    type: String, 
    enum: RangoUsuario, 
    default: RangoUsuario.COBRE 
  })
  rangoActual: RangoUsuario;

  // Rol en el sistema
  @Prop({ 
    type: String, 
    enum: RolUsuario, 
    default: RolUsuario.JUGADOR 
  })
  rol: RolUsuario;

  // Club al que pertenece (referencia)
  @Prop({ type: Types.ObjectId, ref: 'Club', required: false })
  idClub?: Types.ObjectId;

  // Estadísticas por temporadas
  @Prop({ type: [EsquemaEstadisticasUsuario], default: [] })
  estadisticasTemporadas: EstadisticasUsuario[];

  // Configuración de privacidad
  @Prop({ type: EsquemaConfiguracionPrivacidad, default: () => new ConfiguracionPrivacidad() })
  configuracionPrivacidad: ConfiguracionPrivacidad;

  // Estado del usuario
  @Prop({ default: true })
  estaActivo: boolean;

  // Campo alternativo para compatibilidad
  @Prop({ default: true })
  activo?: boolean;

  @Prop({ default: false })
  emailVerificado: boolean;

  // Tokens para verificación y reseteo
  @Prop({ required: false })
  tokenVerificacionEmail?: string;

  @Prop({ required: false })
  tokenReseteoContraseña?: string;

  @Prop({ required: false })
  expiraReseteoContraseña?: Date;

  // Fechas de registro y última actividad
  @Prop({ default: Date.now })
  fechaCreacion: Date;

  @Prop({ default: Date.now })
  fechaActualizacion: Date;

  @Prop({ default: Date.now })
  ultimaActividad: Date;
}

export const EsquemaUsuario = SchemaFactory.createForClass(Usuario);

// Índices para optimización de consultas
EsquemaUsuario.index({ email: 1 }, { unique: true });
EsquemaUsuario.index({ idClub: 1 });
EsquemaUsuario.index({ rangoActual: 1 });
EsquemaUsuario.index({ 'estadisticasTemporadas.temporada': 1 });
EsquemaUsuario.index({ fechaCreacion: -1 });

// Middleware para actualizar fechaActualizacion automáticamente
EsquemaUsuario.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.fechaActualizacion = new Date();
  }
  next();
});

// Método virtual para obtener nombre completo
EsquemaUsuario.virtual('nombreCompleto').get(function(this: DocumentoUsuario) {
  return `${this.nombre} ${this.apellidos}`;
});

// Método para obtener estadísticas de la temporada actual
EsquemaUsuario.methods.obtenerEstadisticasTemporadaActual = function(this: DocumentoUsuario): EstadisticasUsuario | null {
  return this.estadisticasTemporadas.find(stat => stat.temporada === TEMPORADA_ACTUAL.año) || null;
};

// Método para inicializar estadísticas de temporada si no existen
EsquemaUsuario.methods.inicializarEstadisticasTemporadaActual = function(this: DocumentoUsuario): EstadisticasUsuario {
  let estadisticasActuales = this.obtenerEstadisticasTemporadaActual();
  
  if (!estadisticasActuales) {
    estadisticasActuales = {
      temporada: TEMPORADA_ACTUAL.año,
      puntosActuales: 0,
      partidosJugados: 0,
      partidosGanados: 0,
      partidosPerdidos: 0,
      torneosGanados: 0,
      torneosJugados: 0,
      posicionRankingClub: null,
      posicionRankingNacional: null
    };
    this.estadisticasTemporadas.push(estadisticasActuales);
  }
  
  return estadisticasActuales;
};
