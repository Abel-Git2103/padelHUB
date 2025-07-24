import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto, LoginResponseDto, ForgotPasswordDto, ResetPasswordDto, ChangePasswordDto } from './dto/auth.dto';
import { CrearUsuarioDto, RespuestaUsuarioDto } from '../users/dto/user.dto';
import { DocumentoUsuario } from '../users/user.schema';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Autenticar usuario con email y contraseña
   */
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Buscar usuario por email
    const user = await this.usersService.buscarPorEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.contraseña);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar que el usuario esté activo
    if (!user.estaActivo) {
      throw new UnauthorizedException('Usuario desactivado');
    }

    // Actualizar última actividad
    user.ultimaActividad = new Date();
    await user.save();

    // Generar tokens
    const tokens = await this.generateTokens(user);
    const userResponse = await this.usersService.buscarPorId(user._id.toString());

    return {
      ...tokens,
      user: userResponse,
      expiresIn: this.getTokenExpirationTime(),
    };
  }

  /**
   * Registrar nuevo usuario
   */
  async registrar(crearUsuarioDto: CrearUsuarioDto): Promise<LoginResponseDto> {
    // Crear usuario
    const usuario = await this.usersService.crear(crearUsuarioDto);
    
    // Buscar el usuario completo para generar tokens
    const usuarioCompleto = await this.usersService.buscarPorEmail(crearUsuarioDto.email);
    if (!usuarioCompleto) {
      throw new BadRequestException('Error al crear usuario');
    }

    // Generar tokens de bienvenida
    const tokens = await this.generateTokens(usuarioCompleto);

    return {
      ...tokens,
      user: usuario,
      expiresIn: this.getTokenExpirationTime(),
    };
  }

  /**
   * Refrescar token de acceso
   */
  async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.buscarPorEmail(decoded.email);
      if (!user || !user.estaActivo) {
        throw new UnauthorizedException('Token inválido');
      }

      // Generar nuevos tokens
      const tokens = await this.generateTokens(user);
      const userResponse = await this.usersService.buscarPorId(user._id.toString());

      return {
        ...tokens,
        user: userResponse,
        expiresIn: this.getTokenExpirationTime(),
      };
    } catch (error) {
      throw new UnauthorizedException('Token de refresco inválido');
    }
  }

  /**
   * Solicitar reseteo de contraseña
   */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;
    const user = await this.usersService.buscarPorEmail(email);
    
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return { message: 'Si el email existe, recibirás instrucciones para resetear tu contraseña' };
    }

    // Generar token de reseteo
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    user.tokenReseteoContraseña = resetToken;
    user.expiraReseteoContraseña = resetExpires;
    await user.save();

    // TODO: Enviar email con el token de reseteo
    // await this.emailService.sendPasswordResetEmail(user.email, resetToken);

    return { message: 'Si el email existe, recibirás instrucciones para resetear tu contraseña' };
  }

  /**
   * Resetear contraseña con token
   */
  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { token, password } = resetPasswordDto;

    const user = await this.usersService.buscarPorEmail(''); // Buscaremos por token
    // TODO: Implementar búsqueda por token en el servicio de usuarios
    
    if (!user || !user.tokenReseteoContraseña || user.tokenReseteoContraseña !== token) {
      throw new BadRequestException('Token de reseteo inválido o expirado');
    }

    if (!user.expiraReseteoContraseña || user.expiraReseteoContraseña < new Date()) {
      throw new BadRequestException('Token de reseteo expirado');
    }

    // Hashear nueva contraseña
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Actualizar contraseña y limpiar tokens
    user.contraseña = hashedPassword;
    user.tokenReseteoContraseña = undefined;
    user.expiraReseteoContraseña = undefined;
    await user.save();

    return { message: 'Contraseña actualizada exitosamente' };
  }

  /**
   * Cambiar contraseña (usuario autenticado)
   */
  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const { currentPassword, newPassword } = changePasswordDto;

    const userResponse = await this.usersService.buscarPorId(userId);
    const user = await this.usersService.buscarPorEmail(userResponse.email);
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.contraseña);
    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    // Hashear nueva contraseña
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.contraseña = hashedPassword;
    await user.save();

    return { message: 'Contraseña actualizada exitosamente' };
  }

  /**
   * Validar usuario para JWT strategy
   */
  async validateUser(email: string): Promise<RespuestaUsuarioDto | null> {
    const user = await this.usersService.buscarPorEmail(email);
    if (user && user.estaActivo) {
      return this.usersService.buscarPorId(user._id.toString());
    }
    return null;
  }

  /**
   * Generar tokens de acceso y refresco
   */
  private async generateTokens(user: DocumentoUsuario): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.rol,
      clubId: user.idClub?.toString(),
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRE_TIME', '1d'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d', // Token de refresco válido por 7 días
      }),
    ]);

    return { accessToken, refreshToken };
  }

  /**
   * Obtener tiempo de expiración del token en segundos
   */
  private getTokenExpirationTime(): number {
    const expireTime = this.configService.get<string>('JWT_EXPIRE_TIME', '1d');
    // Convertir formato '1d' a segundos (simplificado)
    if (expireTime.endsWith('d')) {
      return parseInt(expireTime) * 24 * 60 * 60;
    }
    if (expireTime.endsWith('h')) {
      return parseInt(expireTime) * 60 * 60;
    }
    return 86400; // Default: 1 día
  }
}
