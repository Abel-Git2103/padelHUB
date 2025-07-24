import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolUsuario } from '../../common/enums';
import { RespuestaUsuarioDto } from '../../users/dto/user.dto';

/**
 * Decorator para especificar roles requeridos
 */
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: RolUsuario[]) => SetMetadata('roles', roles);

/**
 * Guard para verificar roles de usuario
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolUsuario[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // No hay roles requeridos, permitir acceso
    }

    const { user }: { user: RespuestaUsuarioDto } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    const hasRole = requiredRoles.some((role) => user.rol === role);
    
    if (!hasRole) {
      throw new ForbiddenException(`Acceso denegado. Roles requeridos: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}
