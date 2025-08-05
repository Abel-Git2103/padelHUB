import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EstadoClub, RangoUsuario, RestrictionType } from '../common/enums';

export type ClubDocument = Club & Document;

/**
 * Esquema para restricciones individuales
 */
@Schema({ _id: false })
export class ClubRestriction {
  @Prop({ required: true, enum: RestrictionType })
  type: RestrictionType;

  @Prop({ required: true })
  reason: string;

  @Prop({ required: true, default: Date.now })
  appliedDate: Date;

  @Prop()
  expiryDate?: Date;

  @Prop({ required: true })
  appliedBy: string; // ID del administrador que aplicó la restricción

  @Prop({ required: true, default: true })
  isActive: boolean;
}

const ClubRestrictionSchema = SchemaFactory.createForClass(ClubRestriction);

/**
 * Esquema para el sistema de restricciones del club
 */
@Schema({ _id: false })
export class ClubRestrictions {
  @Prop({ required: true, default: false })
  isRestricted: boolean;

  @Prop({ type: [ClubRestrictionSchema], default: [] })
  activeRestrictions: ClubRestriction[];

  @Prop({ type: [String], default: [] })
  restrictionsSummary?: string[]; // Resumen de restricciones activas para UI
}

const ClubRestrictionsSchema = SchemaFactory.createForClass(ClubRestrictions);

/**
 * Configuración de precios del club
 */
@Schema({ _id: false })
export class ClubPricing {
  @Prop({ required: true })
  courtPricePerHour: number;

  @Prop({ default: 0 })
  memberDiscount: number; // Porcentaje de descuento para miembros
  
  // ELIMINADO: allowNonMembers - todos los clubes activos aceptan jugadores externos
  // Esta funcionalidad está incluida en la suscripción de 200€/mes
}

const ClubPricingSchema = SchemaFactory.createForClass(ClubPricing);

/**
 * Información de contacto del club
 */
@Schema({ _id: false })
export class ClubContact {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  website?: string;

  @Prop({ 
    type: Object,
    required: false 
  })
  socialMedia?: {
    facebook?: string;
    instagram?: string; 
    twitter?: string;
  };
}

const ClubContactSchema = SchemaFactory.createForClass(ClubContact);

/**
 * Ubicación del club
 */
@Schema({ _id: false })
export class ClubLocation {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  province: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ 
    type: Object,
    required: false,
    default: null
  })
  coordinates?: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
}

const ClubLocationSchema = SchemaFactory.createForClass(ClubLocation);

/**
 * Estadísticas del club por temporada
 */
@Schema({ _id: false })
export class ClubSeasonStats {
  @Prop({ required: true })
  season: number;

  @Prop({ default: 0 })
  totalMembers: number;

  @Prop({ default: 0 })
  totalMatches: number;

  @Prop({ default: 0 })
  totalTournaments: number;

  // Distribución de miembros por rango
  @Prop({ type: Map, of: Number, default: new Map() })
  membersByRank: Map<RangoUsuario, number>;

  // Ranking del club a nivel nacional
  @Prop({ default: null })
  nationalRankingPosition: number;

  @Prop({ default: 0 })
  totalPoints: number; // Suma de puntos de todos los miembros
}

const ClubSeasonStatsSchema = SchemaFactory.createForClass(ClubSeasonStats);

/**
 * Modelo principal del Club
 */
@Schema({ 
  timestamps: true,
  collection: 'clubs'
})
export class Club {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  logo?: string;

  @Prop({ required: false })
  images?: string[]; // Imágenes de las instalaciones

  // Estado del club
  @Prop({ 
    type: String, 
    enum: EstadoClub, 
    default: EstadoClub.ACTIVO 
  })
  status: EstadoClub;

  // Información de contacto
  @Prop({ type: ClubContactSchema, required: true })
  contact: ClubContact;

  // Ubicación
  @Prop({ type: ClubLocationSchema, required: true })
  location: ClubLocation;

  // Configuración de precios
  @Prop({ type: ClubPricingSchema, required: true })
  pricing: ClubPricing;

  // Capacidad de pistas
  @Prop({ required: true, min: 1 })
  totalCourts: number;

  @Prop({ default: 0 })
  availableCourts: number;

  // Horarios de funcionamiento
  @Prop({ 
    type: Map, 
    of: { open: String, close: String },
    default: new Map()
  })
  operatingHours: Map<string, { open: string; close: string }>; // 'monday' -> { open: '08:00', close: '22:00' }

  // Administradores del club (referencias a usuarios)
  @Prop({ type: [Types.ObjectId], ref: 'Usuario', default: [] })
  administrators: Types.ObjectId[];

  // Estadísticas por temporadas
  @Prop({ type: [ClubSeasonStatsSchema], default: [] })
  seasonStats: ClubSeasonStats[];

  // Configuración de monetización
  @Prop({ default: 200 }) // 200€/mes según documentación
  monthlySubscriptionFee: number;

  @Prop({ default: true })
  isSubscriptionActive: boolean;

  @Prop({ required: false })
  subscriptionExpiresAt?: Date;

  // Métricas en tiempo real del club
  @Prop({ default: 0 })
  currentOpenMatches: number; // Partidos abiertos actualmente esperando jugadores

  @Prop({ default: 0 })
  currentActiveTournaments: number; // Torneos activos en este momento

  @Prop({ default: null })
  currentNationalRanking: number; // Posición actual en ranking nacional

  // Métricas de ocupación
  @Prop({ default: 0 })
  currentOccupiedCourts: number; // Pistas ocupadas en este momento

  @Prop({ default: 0 })
  occupancyPercentage: number; // Porcentaje de ocupación actual

  // Métricas de actividad reciente
  @Prop({ default: 0 })
  newMembersThisMonth: number; // Nuevos miembros este mes

  @Prop({ default: 0 })
  todayReservations: number; // Reservas de hoy

  // Métricas de rendimiento
  @Prop({ default: 0 })
  monthlyRevenue: number; // Ingresos del mes actual

  @Prop({ default: 0 })
  avgDailyReservations: number; // Promedio de reservas por día

  // Sistema de restricciones administrativas
  @Prop({ type: ClubRestrictionsSchema, default: () => ({ isRestricted: false, activeRestrictions: [], restrictionsSummary: [] }) })
  restrictions: ClubRestrictions;

  // Configuraciones específicas del club
  // Removidas allowTournaments y allowExternalPlayers
  // Estas funcionalidades están SIEMPRE habilitadas para clubes activos
  // Los clubes pagan 200€/mes para acceso completo al ecosistema

  @Prop({ default: false })
  requireMembershipApproval: boolean; // Si requiere aprobación para unirse

  // Fechas
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ClubSchema = SchemaFactory.createForClass(Club);

// Índices para optimización
ClubSchema.index({ name: 1 }, { unique: true });
ClubSchema.index({ status: 1 });
ClubSchema.index({ 'location.city': 1 });
ClubSchema.index({ 'location.province': 1 });
// TEMPORAL: Comentado hasta que las coordenadas funcionen correctamente
// ClubSchema.index({ 'location.coordinates': '2dsphere' }); // Para búsquedas geoespaciales
ClubSchema.index({ createdAt: -1 });

// Middleware para actualizar updatedAt
ClubSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Método para obtener estadísticas de la temporada actual
ClubSchema.methods.getCurrentSeasonStats = function(): ClubSeasonStats | null {
  const currentYear = new Date().getFullYear();
  return this.seasonStats.find(stat => stat.season === currentYear) || null;
};

// Método para verificar si el club está activo y con suscripción válida
ClubSchema.methods.isOperational = function(): boolean {
  const now = new Date();
  return this.status === EstadoClub.ACTIVO && 
         this.isSubscriptionActive && 
         (!this.subscriptionExpiresAt || this.subscriptionExpiresAt > now) &&
         !this.restrictions.isRestricted;
};

// Métodos para manejo de restricciones
ClubSchema.methods.addRestriction = function(restriction: ClubRestriction): void {
  if (!this.restrictions) {
    this.restrictions = { isRestricted: false, activeRestrictions: [], restrictionsSummary: [] };
  }
  
  // Remover restricción existente del mismo tipo si existe
  this.restrictions.activeRestrictions = this.restrictions.activeRestrictions.filter(
    r => r.type !== restriction.type
  );
  
  // Agregar nueva restricción
  this.restrictions.activeRestrictions.push(restriction);
  this.restrictions.isRestricted = true;
  
  // Actualizar resumen
  this.updateRestrictionsSummary();
};

ClubSchema.methods.removeRestriction = function(restrictionType: RestrictionType): boolean {
  if (!this.restrictions || this.restrictions.activeRestrictions.length === 0) {
    return false;
  }
  
  const initialLength = this.restrictions.activeRestrictions.length;
  this.restrictions.activeRestrictions = this.restrictions.activeRestrictions.filter(
    r => r.type !== restrictionType
  );
  
  // Si no quedan restricciones activas, marcar como no restringido
  if (this.restrictions.activeRestrictions.length === 0) {
    this.restrictions.isRestricted = false;
    this.restrictions.restrictionsSummary = [];
  } else {
    this.updateRestrictionsSummary();
  }
  
  return this.restrictions.activeRestrictions.length < initialLength;
};

ClubSchema.methods.hasRestriction = function(restrictionType: RestrictionType): boolean {
  return this.restrictions?.activeRestrictions?.some(r => r.type === restrictionType && r.isActive) || false;
};

ClubSchema.methods.updateRestrictionsSummary = function(): void {
  if (!this.restrictions) return;
  
  this.restrictions.restrictionsSummary = this.restrictions.activeRestrictions
    .filter(r => r.isActive)
    .map(r => r.type);
};

ClubSchema.methods.getActiveRestrictions = function(): ClubRestriction[] {
  return this.restrictions?.activeRestrictions?.filter(r => r.isActive) || [];
};
