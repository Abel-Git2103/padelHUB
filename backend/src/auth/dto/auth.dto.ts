import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RespuestaUsuarioDto } from '../../users/dto/user.dto';

/**
 * DTO para login
 */
export class LoginDto {
  @ApiProperty({ 
    description: 'Email del usuario',
    example: 'juan.perez@email.com'
  })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;

  @ApiProperty({ 
    description: 'Contraseña del usuario',
    example: 'password123'
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

/**
 * DTO de respuesta del login exitoso
 */
export class LoginResponseDto {
  @ApiProperty({ 
    description: 'Token de acceso JWT',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken: string;

  @ApiProperty({ 
    description: 'Token de refresco',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken: string;

  @ApiProperty({ 
    description: 'Información del usuario autenticado',
    type: RespuestaUsuarioDto
  })
  user: RespuestaUsuarioDto;

  @ApiProperty({ 
    description: 'Tiempo de expiración del token en segundos',
    example: 86400
  })
  expiresIn: number;
}

/**
 * DTO para refresh token
 */
export class RefreshTokenDto {
  @ApiProperty({ 
    description: 'Token de refresco',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @IsString()
  refreshToken: string;
}

/**
 * DTO para solicitud de reseteo de contraseña
 */
export class ForgotPasswordDto {
  @ApiProperty({ 
    description: 'Email del usuario que solicita el reseteo',
    example: 'juan.perez@email.com'
  })
  @IsEmail({}, { message: 'Debe ser un email válido' })
  email: string;
}

/**
 * DTO para reseteo de contraseña
 */
export class ResetPasswordDto {
  @ApiProperty({ 
    description: 'Token de reseteo recibido por email',
    example: 'abc123def456'
  })
  @IsString()
  token: string;

  @ApiProperty({ 
    description: 'Nueva contraseña',
    example: 'newPassword123'
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}

/**
 * DTO para cambio de contraseña (usuario autenticado)
 */
export class ChangePasswordDto {
  @ApiProperty({ 
    description: 'Contraseña actual',
    example: 'currentPassword123'
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({ 
    description: 'Nueva contraseña',
    example: 'newPassword123'
  })
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  newPassword: string;
}
