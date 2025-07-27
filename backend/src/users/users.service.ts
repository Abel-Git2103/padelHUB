import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Usuario, DocumentoUsuario } from './user.schema';
import { CrearUsuarioDto, ActualizarUsuarioDto, ActualizarConfiguracionPrivacidadDto, RespuestaUsuarioDto } from './dto/user.dto';
import { RangoUsuario, TEMPORADA_ACTUAL } from '../common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Usuario.name) private userModel: Model<DocumentoUsuario>,
  ) {}

  /**
   * Crear un nuevo usuario
   */
  async crear(crearUsuarioDto: CrearUsuarioDto): Promise<RespuestaUsuarioDto> {
    // Verificar si el email ya existe
    const usuarioExistente = await this.userModel.findOne({ email: crearUsuarioDto.email });
    if (usuarioExistente) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de la contraseña
    const saltRounds = 12;
    const contraseñaHasheada = await bcrypt.hash(crearUsuarioDto.password, saltRounds);

    // Crear usuario con estadísticas iniciales
    const datosUsuario = {
      ...crearUsuarioDto,
      contraseña: contraseñaHasheada,
      rangoActual: crearUsuarioDto.rangoActual || RangoUsuario.COBRE,
    };

    const usuarioCreado = new this.userModel(datosUsuario);
    
    // Inicializar estadísticas de la temporada actual
    usuarioCreado.inicializarEstadisticasTemporadaActual();
    
    await usuarioCreado.save();

    return this.aRespuestaUsuario(usuarioCreado);
  }

  /**
   * Buscar usuario por email
   */
  async buscarPorEmail(email: string): Promise<DocumentoUsuario | null> {
    return this.userModel.findOne({ email, activo: true }).populate('idClub');
  }

  /**
   * Buscar usuario por ID
   */
  async buscarPorId(id: string): Promise<RespuestaUsuarioDto> {
    const usuario = await this.userModel.findById(id).populate('idClub');
    if (!usuario || !usuario.activo) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.aRespuestaUsuario(usuario);
  }

  /**
   * Obtener todos los usuarios con filtros
   */
  async buscarTodos(
    pagina: number = 1,
    limite: number = 10,
    rango?: RangoUsuario,
    idClub?: string
  ): Promise<{ usuarios: RespuestaUsuarioDto[]; total: number; totalPaginas: number }> {
    const consulta: any = { activo: true };
    
    if (rango) consulta.rangoActual = rango;
    if (idClub) consulta.idClub = idClub;

    const saltar = (pagina - 1) * limite;
    
    const [usuarios, total] = await Promise.all([
      this.userModel
        .find(consulta)
        .populate('idClub')
        .skip(saltar)
        .limit(limite)
        .sort({ fechaCreacion: -1 })
        .exec(),
      this.userModel.countDocuments(consulta),
    ]);

    return {
      usuarios: usuarios.map(usuario => this.aRespuestaUsuario(usuario)),
      total,
      totalPaginas: Math.ceil(total / limite),
    };
  }

  /**
   * Actualizar usuario
   */
  async actualizar(id: string, actualizarUsuarioDto: ActualizarUsuarioDto): Promise<RespuestaUsuarioDto> {
    const usuario = await this.userModel.findById(id);
    if (!usuario || !usuario.activo) {
      throw new NotFoundException('Usuario no encontrado');
    }

    Object.assign(usuario, actualizarUsuarioDto);
    await usuario.save();

    return this.aRespuestaUsuario(usuario);
  }

  /**
   * Actualizar configuración de privacidad
   */
  async actualizarConfiguracionPrivacidad(id: string, privacidadDto: ActualizarConfiguracionPrivacidadDto): Promise<RespuestaUsuarioDto> {
    const usuario = await this.userModel.findById(id);
    if (!usuario || !usuario.activo) {
      throw new NotFoundException('Usuario no encontrado');
    }

    Object.assign(usuario.configuracionPrivacidad, privacidadDto);
    await usuario.save();

    return this.aRespuestaUsuario(usuario);
  }

  /**
   * Cambiar rango de usuario (solo para administradores)
   */
  async actualizarRango(id: string, nuevoRango: RangoUsuario): Promise<RespuestaUsuarioDto> {
    const usuario = await this.userModel.findById(id);
    if (!usuario || !usuario.activo) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.rangoActual = nuevoRango;
    await usuario.save();

    return this.aRespuestaUsuario(usuario);
  }

  /**
   * Unir usuario a un club
   */
  async unirseAClub(idUsuario: string, idClub: string): Promise<RespuestaUsuarioDto> {
    const usuario = await this.userModel.findById(idUsuario);
    if (!usuario || !usuario.activo) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (usuario.idClub) {
      throw new BadRequestException('El usuario ya pertenece a un club');
    }

    usuario.idClub = idClub as any;
    await usuario.save();

    return this.aRespuestaUsuario(usuario);
  }

  /**
   * Salir de un club
   */
  async salirDeClub(idUsuario: string): Promise<RespuestaUsuarioDto> {
    const usuario = await this.userModel.findById(idUsuario);
    if (!usuario || !usuario.activo) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.idClub = undefined;
    await usuario.save();

    return this.aRespuestaUsuario(usuario);
  }

  /**
   * Actualizar puntos del usuario (usado por el sistema de partidos)
   */
  async actualizarPuntos(idUsuario: string, cambioPuntos: number): Promise<void> {
    const usuario = await this.userModel.findById(idUsuario);
    if (!usuario || !usuario.activo) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const estadisticasActuales = usuario.inicializarEstadisticasTemporadaActual();
    estadisticasActuales.puntosActuales += cambioPuntos;
    
    // Determinar nuevo rango basado en puntos
    const nuevoRango = this.calcularRangoPorPuntos(estadisticasActuales.puntosActuales);
    if (nuevoRango !== usuario.rangoActual) {
      usuario.rangoActual = nuevoRango;
    }

    await usuario.save();
  }

  /**
   * Desactivar usuario (soft delete)
   */
  async desactivar(id: string): Promise<void> {
    const resultado = await this.userModel.updateOne(
      { _id: id },
      { activo: false }
    );

    if (resultado.matchedCount === 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
  }

  /**
   * Verificar email de usuario
   */
  async verificarEmail(id: string): Promise<RespuestaUsuarioDto> {
    const usuario = await this.userModel.findById(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    usuario.emailVerificado = true;
    usuario.tokenVerificacionEmail = undefined;
    await usuario.save();

    return this.aRespuestaUsuario(usuario);
  }

  /**
   * Convertir documento de usuario a DTO de respuesta
   */
  private aRespuestaUsuario(usuario: DocumentoUsuario): RespuestaUsuarioDto {
    return {
      id: usuario._id.toString(),
      email: usuario.email,
      nombreCompleto: usuario.nombreCompleto,
      nombre: usuario.nombre,
      apellidos: usuario.apellidos,
      rangoActual: usuario.rangoActual,
      rol: usuario.rol,
      imagenPerfil: usuario.imagenPerfil,
      idClub: usuario.idClub?.toString(),
      activo: usuario.activo,
      emailVerificado: usuario.emailVerificado,
      fechaCreacion: usuario.fechaCreacion,
      ultimaActividad: usuario.ultimaActividad,
    };
  }

  /**
   * Calcular rango basado en puntos
   */
  private calcularRangoPorPuntos(puntos: number): RangoUsuario {
    if (puntos >= 6.0) return RangoUsuario.PLATINO;
    if (puntos >= 4.0) return RangoUsuario.ORO;
    if (puntos >= 2.0) return RangoUsuario.PLATA;
    if (puntos >= 1.0) return RangoUsuario.BRONCE;
    return RangoUsuario.COBRE;
  }
}
