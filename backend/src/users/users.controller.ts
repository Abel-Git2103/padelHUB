import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
  ParseEnumPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CrearUsuarioDto, ActualizarUsuarioDto, ActualizarConfiguracionPrivacidadDto, RespuestaUsuarioDto } from './dto/user.dto';
import { RangoUsuario } from '../common/enums';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  async crear(@Body() crearUsuarioDto: CrearUsuarioDto): Promise<RespuestaUsuarioDto> {
    return this.usersService.crear(crearUsuarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de usuarios con filtros' })
  @ApiQuery({ name: 'pagina', required: false, description: 'Número de página (default: 1)' })
  @ApiQuery({ name: 'limite', required: false, description: 'Elementos por página (default: 10)' })
  @ApiQuery({ name: 'rango', required: false, enum: RangoUsuario, description: 'Filtrar por rango' })
  @ApiQuery({ name: 'idClub', required: false, description: 'Filtrar por ID del club' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        usuarios: {
          type: 'array',
          items: { $ref: '#/components/schemas/RespuestaUsuarioDto' },
        },
        total: { type: 'number', description: 'Total de usuarios' },
        totalPaginas: { type: 'number', description: 'Total de páginas' },
      },
    },
  })
  async buscarTodos(
    @Query('pagina', new ParseIntPipe({ optional: true })) pagina: number = 1,
    @Query('limite', new ParseIntPipe({ optional: true })) limite: number = 10,
    @Query('rango', new ParseEnumPipe(RangoUsuario, { optional: true })) rango?: RangoUsuario,
    @Query('idClub') idClub?: string,
  ) {
    return this.usersService.buscarTodos(pagina, limite, rango, idClub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async buscarUno(@Param('id') id: string): Promise<RespuestaUsuarioDto> {
    return this.usersService.buscarPorId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar datos del usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado exitosamente',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async actualizar(
    @Param('id') id: string,
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
  ): Promise<RespuestaUsuarioDto> {
    return this.usersService.actualizar(id, actualizarUsuarioDto);
  }

  @Patch(':id/privacidad')
  @ApiOperation({ summary: 'Actualizar configuración de privacidad' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Configuración de privacidad actualizada',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async actualizarPrivacidad(
    @Param('id') id: string,
    @Body() privacidadDto: ActualizarConfiguracionPrivacidadDto,
  ): Promise<RespuestaUsuarioDto> {
    return this.usersService.actualizarConfiguracionPrivacidad(id, privacidadDto);
  }

  @Patch(':id/rango')
  @ApiOperation({ summary: 'Actualizar rango del usuario (solo administradores)' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Rango actualizado exitosamente',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async actualizarRango(
    @Param('id') id: string,
    @Body('rango', new ParseEnumPipe(RangoUsuario)) rango: RangoUsuario,
  ): Promise<RespuestaUsuarioDto> {
    return this.usersService.actualizarRango(id, rango);
  }

  @Post(':id/unirse-club/:idClub')
  @ApiOperation({ summary: 'Unir usuario a un club' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiParam({ name: 'idClub', description: 'ID del club' })
  @ApiResponse({
    status: 200,
    description: 'Usuario unido al club exitosamente',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 400, description: 'El usuario ya pertenece a un club' })
  async unirseAClub(
    @Param('id') id: string,
    @Param('idClub') idClub: string,
  ): Promise<RespuestaUsuarioDto> {
    return this.usersService.unirseAClub(id, idClub);
  }

  @Delete(':id/salir-club')
  @ApiOperation({ summary: 'Salir del club actual' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario salió del club exitosamente',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async salirDeClub(@Param('id') id: string): Promise<RespuestaUsuarioDto> {
    return this.usersService.salirDeClub(id);
  }

  @Patch(':id/verificar-email')
  @ApiOperation({ summary: 'Verificar email del usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Email verificado exitosamente',
    type: RespuestaUsuarioDto,
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async verificarEmail(@Param('id') id: string): Promise<RespuestaUsuarioDto> {
    return this.usersService.verificarEmail(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar usuario (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario desactivado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async eliminar(@Param('id') id: string): Promise<{ mensaje: string }> {
    await this.usersService.desactivar(id);
    return { mensaje: 'Usuario desactivado exitosamente' };
  }
}
