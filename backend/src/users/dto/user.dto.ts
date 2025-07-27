import { IsEmail, IsString, IsOptional, IsEnum, IsDateString, IsBoolean, MinLength, MaxLength, IsPhoneNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RangoUsuario, RolUsuario } from '../../common/enums';

/**
 * DTO para registro de usuarios
 */
export class CrearUsuarioDto {
  @ApiProperty({ 
    description: 'Email del usuario',
    example: 'juan.perez@email.com'
  })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @ApiProperty({ 
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'password123'
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @ApiProperty({ 
    description: 'Nombre del usuario',
    example: 'Juan'
  })
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
  nombre: string;

  @ApiProperty({ 
    description: 'Apellidos del usuario',
    example: 'Pérez García'
  })
  @IsString()
  @MinLength(2, { message: 'Los apellidos deben tener al menos 2 caracteres' })
  @MaxLength(100, { message: 'Los apellidos no pueden exceder 100 caracteres' })
  apellidos: string;

  @ApiPropertyOptional({ 
    description: 'Teléfono del usuario',
    example: '+34600123456'
  })
  @IsOptional()
  @IsPhoneNumber('ES', { message: 'Debe ser un número de teléfono español válido' })
  telefono?: string;

  @ApiPropertyOptional({ 
    description: 'Fecha de nacimiento',
    example: '1990-05-15'
  })
  @IsOptional()
  @IsDateString({}, { message: 'Debe ser una fecha válida' })
  fechaNacimiento?: string;

  @ApiPropertyOptional({ 
    description: 'Ubicación del usuario',
    example: 'Madrid, España'
  })
  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'La ubicación no puede exceder 200 caracteres' })
  ubicacion?: string;

  @ApiPropertyOptional({ 
    description: 'Rango inicial del usuario',
    enum: RangoUsuario,
    example: RangoUsuario.COBRE
  })
  @IsOptional()
  @IsEnum(RangoUsuario, { message: 'El rango debe ser válido' })
  rangoActual?: RangoUsuario;

  @ApiPropertyOptional({ 
    description: 'ID del club al que se unirá (opcional)',
    example: '507f1f77bcf86cd799439011'
  })
  @IsOptional()
  @IsString()
  idClub?: string;
}

/**
 * DTO para actualización de usuarios
 */
export class ActualizarUsuarioDto {
  @ApiPropertyOptional({ 
    description: 'Nombre del usuario',
    example: 'Juan Carlos'
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre?: string;

  @ApiPropertyOptional({ 
    description: 'Apellidos del usuario',
    example: 'Pérez García'
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  apellidos?: string;

  @ApiPropertyOptional({ 
    description: 'Teléfono del usuario',
    example: '+34600123456'
  })
  @IsOptional()
  @IsPhoneNumber('ES')
  telefono?: string;

  @ApiPropertyOptional({ 
    description: 'Fecha de nacimiento',
    example: '1990-05-15'
  })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @ApiPropertyOptional({ 
    description: 'Ubicación del usuario',
    example: 'Barcelona, España'
  })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  ubicacion?: string;

  @ApiPropertyOptional({ 
    description: 'URL de la imagen de perfil',
    example: 'https://example.com/avatar.jpg'
  })
  @IsOptional()
  @IsString()
  imagenPerfil?: string;
}

/**
 * DTO para configuración de privacidad
 */
export class ActualizarConfiguracionPrivacidadDto {
  @ApiPropertyOptional({ 
    description: 'Mostrar email en el perfil',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  mostrarEmail?: boolean;

  @ApiPropertyOptional({ 
    description: 'Mostrar teléfono en el perfil',
    example: false
  })
  @IsOptional()
  @IsBoolean()
  mostrarTelefono?: boolean;

  @ApiPropertyOptional({ 
    description: 'Mostrar estadísticas en el perfil',
    example: true
  })
  @IsOptional()
  @IsBoolean()
  mostrarEstadisticas?: boolean;

  @ApiPropertyOptional({ 
    description: 'Mostrar ubicación en el perfil',
    example: false
  })
  @IsOptional()
  @IsBoolean()
  mostrarUbicacion?: boolean;
}

/**
 * DTO de respuesta del usuario (sin datos sensibles)
 */
export class RespuestaUsuarioDto {
  @ApiProperty({ description: 'ID del usuario' })
  id: string;

  @ApiProperty({ description: 'Email del usuario' })
  email: string;

  @ApiProperty({ description: 'Nombre completo' })
  nombreCompleto: string;

  @ApiProperty({ description: 'Nombre' })
  nombre: string;

  @ApiProperty({ description: 'Apellidos' })
  apellidos: string;

  @ApiProperty({ description: 'Rango actual', enum: RangoUsuario })
  rangoActual: RangoUsuario;

  @ApiProperty({ description: 'Rol del usuario', enum: RolUsuario })
  rol: RolUsuario;

  @ApiPropertyOptional({ description: 'Imagen de perfil' })
  imagenPerfil?: string;

  @ApiPropertyOptional({ description: 'ID del club' })
  idClub?: string;

  @ApiProperty({ description: 'Usuario activo' })
  activo: boolean;

  @ApiProperty({ description: 'Email verificado' })
  emailVerificado: boolean;

  @ApiProperty({ description: 'Fecha de registro' })
  fechaCreacion: Date;

  @ApiProperty({ description: 'Última actividad' })
  ultimaActividad: Date;
}
