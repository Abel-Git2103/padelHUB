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

import { ClubsService } from './clubs.service';
import { CreateClubDto, UpdateClubDto, ClubResponseDto } from './dto/club.dto';
import { EstadoClub } from '../common/enums';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { RolUsuario } from '../common/enums';

@ApiTags('clubs')
@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN_SISTEMA, RolUsuario.ADMIN_CLUB)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un nuevo club' })
  @ApiResponse({
    status: 201,
    description: 'Club creado exitosamente',
    type: ClubResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Ya existe un club con ese nombre' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async create(@Body() createClubDto: CreateClubDto): Promise<ClubResponseDto> {
    return this.clubsService.create(createClubDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de clubes con filtros' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por página (default: 10)' })
  @ApiQuery({ name: 'status', required: false, enum: EstadoClub, description: 'Filtrar por estado' })
  @ApiQuery({ name: 'city', required: false, description: 'Filtrar por ciudad' })
  @ApiQuery({ name: 'province', required: false, description: 'Filtrar por provincia' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clubes obtenida exitosamente',
    schema: {
      type: 'object',
      properties: {
        clubs: {
          type: 'array',
          items: { $ref: '#/components/schemas/ClubResponseDto' },
        },
        total: { type: 'number', description: 'Total de clubes' },
        totalPages: { type: 'number', description: 'Total de páginas' },
      },
    },
  })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('status', new ParseEnumPipe(EstadoClub, { optional: true })) status?: EstadoClub,
    @Query('city') city?: string,
    @Query('province') province?: string,
  ) {
    return this.clubsService.findAll(page, limit, status, city, province);
  }

  @Get('operational')
  @ApiOperation({ summary: 'Obtener clubes operacionales (activos y con suscripción válida)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clubes operacionales',
    type: [ClubResponseDto],
  })
  async findOperational(): Promise<ClubResponseDto[]> {
    return this.clubsService.findOperationalClubs();
  }

  @Get('by-location')
  @ApiOperation({ summary: 'Buscar clubes por ubicación geográfica' })
  @ApiQuery({ name: 'lat', description: 'Latitud' })
  @ApiQuery({ name: 'lng', description: 'Longitud' })
  @ApiQuery({ name: 'radius', required: false, description: 'Radio en km (default: 10)' })
  @ApiResponse({
    status: 200,
    description: 'Clubes encontrados en el área',
    type: [ClubResponseDto],
  })
  async findByLocation(
    @Query('lat', ParseIntPipe) latitude: number,
    @Query('lng', ParseIntPipe) longitude: number,
    @Query('radius', new ParseIntPipe({ optional: true })) radius: number = 10,
  ): Promise<ClubResponseDto[]> {
    return this.clubsService.findByLocation(latitude, longitude, radius);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener club por ID' })
  @ApiParam({ name: 'id', description: 'ID del club' })
  @ApiResponse({
    status: 200,
    description: 'Club encontrado',
    type: ClubResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Club no encontrado' })
  async findOne(@Param('id') id: string): Promise<ClubResponseDto> {
    return this.clubsService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN_SISTEMA, RolUsuario.ADMIN_CLUB)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar datos del club' })
  @ApiParam({ name: 'id', description: 'ID del club' })
  @ApiResponse({
    status: 200,
    description: 'Club actualizado exitosamente',
    type: ClubResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Club no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async update(
    @Param('id') id: string,
    @Body() updateClubDto: UpdateClubDto,
  ): Promise<ClubResponseDto> {
    return this.clubsService.update(id, updateClubDto);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN_SISTEMA)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar estado del club (solo admin sistema)' })
  @ApiParam({ name: 'id', description: 'ID del club' })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado exitosamente',
    type: ClubResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Club no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async updateStatus(
    @Param('id') id: string,
    @Body('status', new ParseEnumPipe(EstadoClub)) status: EstadoClub,
  ): Promise<ClubResponseDto> {
    return this.clubsService.updateStatus(id, status);
  }

  @Post(':id/administrators/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN_SISTEMA, RolUsuario.ADMIN_CLUB)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar administrador al club' })
  @ApiParam({ name: 'id', description: 'ID del club' })
  @ApiParam({ name: 'userId', description: 'ID del usuario a agregar como admin' })
  @ApiResponse({
    status: 200,
    description: 'Administrador agregado exitosamente',
    type: ClubResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Club no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async addAdministrator(
    @Param('id') clubId: string,
    @Param('userId') userId: string,
  ): Promise<ClubResponseDto> {
    return this.clubsService.addAdministrator(clubId, userId);
  }

  @Delete(':id/administrators/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RolUsuario.ADMIN_SISTEMA, RolUsuario.ADMIN_CLUB)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover administrador del club' })
  @ApiParam({ name: 'id', description: 'ID del club' })
  @ApiParam({ name: 'userId', description: 'ID del usuario a remover como admin' })
  @ApiResponse({
    status: 200,
    description: 'Administrador removido exitosamente',
    type: ClubResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Club no encontrado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  async removeAdministrator(
    @Param('id') clubId: string,
    @Param('userId') userId: string,
  ): Promise<ClubResponseDto> {
    return this.clubsService.removeAdministrator(clubId, userId);
  }

  @Get(':id/operational-status')
  @ApiOperation({ summary: 'Verificar si el club está operacional' })
  @ApiParam({ name: 'id', description: 'ID del club' })
  @ApiResponse({
    status: 200,
    description: 'Estado operacional del club',
    schema: {
      type: 'object',
      properties: {
        isOperational: { type: 'boolean' },
      },
    },
  })
  async checkOperationalStatus(@Param('id') id: string): Promise<{ isOperational: boolean }> {
    const isOperational = await this.clubsService.isOperational(id);
    return { isOperational };
  }
}
