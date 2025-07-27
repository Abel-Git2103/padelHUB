import { 
  IsString, 
  IsOptional, 
  IsEnum, 
  IsNumber, 
  IsBoolean, 
  IsArray, 
  IsEmail, 
  IsUrl, 
  ValidateNested, 
  Min, 
  Max,
  IsPhoneNumber,
  IsObject,
  IsDateString
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoClub } from '../../common/enums';

/**
 * DTO para información de contacto del club
 */
export class ClubContactDto {
  @ApiProperty({ description: 'Email de contacto del club' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono de contacto' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ description: 'Sitio web del club' })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiPropertyOptional({ description: 'Redes sociales' })
  @IsOptional()
  @IsObject()
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

/**
 * DTO para ubicación del club
 */
export class ClubLocationDto {
  @ApiProperty({ description: 'Dirección completa' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Ciudad' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Provincia' })
  @IsString()
  province: string;

  @ApiProperty({ description: 'Código postal' })
  @IsString()
  postalCode: string;

  @ApiPropertyOptional({ description: 'Coordenadas [longitud, latitud]' })
  @IsOptional()
  @IsArray()
  coordinates?: [number, number];
}

/**
 * DTO para precios del club
 */
export class ClubPricingDto {
  @ApiProperty({ description: 'Precio por hora de pista' })
  @IsNumber()
  @Min(0)
  courtPricePerHour: number;

  @ApiPropertyOptional({ description: 'Descuento para miembros (%)' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  memberDiscount?: number;

  @ApiPropertyOptional({ description: 'Permitir jugadores externos' })
  @IsOptional()
  @IsBoolean()
  allowNonMembers?: boolean;
}

/**
 * DTO para crear un club
 */
export class CreateClubDto {
  @ApiProperty({ description: 'Nombre del club' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descripción del club' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'URL del logo' })
  @IsOptional()
  @IsUrl()
  logo?: string;

  @ApiPropertyOptional({ description: 'Array de URLs de imágenes' })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiProperty({ description: 'Información de contacto', type: ClubContactDto })
  @ValidateNested()
  @Type(() => ClubContactDto)
  contact: ClubContactDto;

  @ApiProperty({ description: 'Ubicación del club', type: ClubLocationDto })
  @ValidateNested()
  @Type(() => ClubLocationDto)
  location: ClubLocationDto;

  @ApiProperty({ description: 'Configuración de precios', type: ClubPricingDto })
  @ValidateNested()
  @Type(() => ClubPricingDto)
  pricing: ClubPricingDto;

  @ApiProperty({ description: 'Número total de pistas' })
  @IsNumber()
  @Min(1)
  totalCourts: number;

  @ApiPropertyOptional({ description: 'Horarios de funcionamiento' })
  @IsOptional()
  @IsObject()
  operatingHours?: Map<string, { open: string; close: string }>;

  @ApiPropertyOptional({ description: 'Permitir torneos' })
  @IsOptional()
  @IsBoolean()
  allowTournaments?: boolean;

  @ApiPropertyOptional({ description: 'Permitir jugadores externos' })
  @IsOptional()
  @IsBoolean()
  allowExternalPlayers?: boolean;

  @ApiPropertyOptional({ description: 'Requiere aprobación para membresía' })
  @IsOptional()
  @IsBoolean()
  requireMembershipApproval?: boolean;
}

/**
 * DTO para actualizar un club
 */
export class UpdateClubDto {
  @ApiPropertyOptional({ description: 'Nombre del club' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Descripción del club' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'URL del logo' })
  @IsOptional()
  @IsUrl()
  logo?: string;

  @ApiPropertyOptional({ description: 'Array de URLs de imágenes' })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiPropertyOptional({ description: 'Información de contacto', type: ClubContactDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClubContactDto)
  contact?: ClubContactDto;

  @ApiPropertyOptional({ description: 'Ubicación del club', type: ClubLocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClubLocationDto)
  location?: ClubLocationDto;

  @ApiPropertyOptional({ description: 'Configuración de precios', type: ClubPricingDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ClubPricingDto)
  pricing?: ClubPricingDto;

  @ApiPropertyOptional({ description: 'Número total de pistas' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  totalCourts?: number;

  @ApiPropertyOptional({ description: 'Pistas disponibles' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  availableCourts?: number;

  @ApiPropertyOptional({ description: 'Horarios de funcionamiento' })
  @IsOptional()
  @IsObject()
  operatingHours?: Map<string, { open: string; close: string }>;

  @ApiPropertyOptional({ description: 'Permitir torneos' })
  @IsOptional()
  @IsBoolean()
  allowTournaments?: boolean;

  @ApiPropertyOptional({ description: 'Permitir jugadores externos' })
  @IsOptional()
  @IsBoolean()
  allowExternalPlayers?: boolean;

  @ApiPropertyOptional({ description: 'Requiere aprobación para membresía' })
  @IsOptional()
  @IsBoolean()
  requireMembershipApproval?: boolean;
}

/**
 * DTO de respuesta del club
 */
export class ClubResponseDto {
  @ApiProperty({ description: 'ID del club' })
  _id: string;

  @ApiProperty({ description: 'Nombre del club' })
  name: string;

  @ApiProperty({ description: 'Descripción del club' })
  description: string;

  @ApiPropertyOptional({ description: 'URL del logo' })
  logo?: string;

  @ApiPropertyOptional({ description: 'Array de URLs de imágenes' })
  images?: string[];

  @ApiProperty({ description: 'Estado del club', enum: EstadoClub })
  status: EstadoClub;

  @ApiProperty({ description: 'Información de contacto' })
  contact: any;

  @ApiProperty({ description: 'Ubicación del club' })
  location: any;

  @ApiProperty({ description: 'Configuración de precios' })
  pricing: any;

  @ApiProperty({ description: 'Número total de pistas' })
  totalCourts: number;

  @ApiProperty({ description: 'Pistas disponibles' })
  availableCourts: number;

  @ApiProperty({ description: 'Horarios de funcionamiento' })
  operatingHours: any;

  @ApiProperty({ description: 'Administradores del club' })
  administrators: any[];

  @ApiPropertyOptional({ description: 'Estadísticas de la temporada actual' })
  currentSeasonStats?: any;

  @ApiProperty({ description: 'Cuota mensual de suscripción' })
  monthlySubscriptionFee: number;

  @ApiProperty({ description: 'Suscripción activa' })
  isSubscriptionActive: boolean;

  @ApiPropertyOptional({ description: 'Fecha de expiración de suscripción' })
  subscriptionExpiresAt?: Date;

  @ApiProperty({ description: 'Permitir torneos' })
  allowTournaments: boolean;

  @ApiProperty({ description: 'Permitir jugadores externos' })
  allowExternalPlayers: boolean;

  @ApiProperty({ description: 'Requiere aprobación para membresía' })
  requireMembershipApproval: boolean;

  @ApiProperty({ description: 'Fecha de creación' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de última actualización' })
  updatedAt: Date;
}
