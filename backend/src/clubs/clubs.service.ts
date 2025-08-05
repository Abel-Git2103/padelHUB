import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club, ClubDocument, ClubRestriction } from './club.schema';
import { CreateClubDto, UpdateClubDto, ClubResponseDto } from './dto/club.dto';
import { EstadoClub, TEMPORADA_ACTUAL, RestrictionType } from '../common/enums';
import { Usuario, DocumentoUsuario } from '../users/user.schema';

@Injectable()
export class ClubsService {
  constructor(
    @InjectModel(Club.name) private clubModel: Model<ClubDocument>,
    @InjectModel(Usuario.name) private userModel: Model<DocumentoUsuario>,
  ) {}

  /**
   * Crear un nuevo club
   */
  async create(createClubDto: CreateClubDto): Promise<ClubResponseDto> {
    try {
      // Verificar si el nombre ya existe
      const existingClub = await this.clubModel.findOne({ name: createClubDto.name });
      if (existingClub) {
        throw new ConflictException('Ya existe un club con ese nombre');
      }

      // Crear la instancia del modelo
      const createdClub = new this.clubModel(createClubDto);
      
      // Guardar en la base de datos
      await createdClub.save();
      
      // Convertir a DTO de respuesta
      return this.toClubResponse(createdClub);
      
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      
      // Re-lanzar el error original con más contexto
      throw new Error(`Error interno al crear club: ${error.message}`);
    }
  }

  /**
   * Obtener todos los clubes con filtros
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
    status?: EstadoClub,
    city?: string,
    province?: string
  ): Promise<{ clubs: ClubResponseDto[]; total: number; totalPages: number }> {
    const query: any = {};
    
    if (status) query.status = status;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (province) query['location.province'] = new RegExp(province, 'i');

    const skip = (page - 1) * limit;
    
    const [clubs, total] = await Promise.all([
      this.clubModel
        .find(query)
        .populate('administrators', 'firstName lastName email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.clubModel.countDocuments(query),
    ]);

    return {
      clubs: clubs.map(club => this.toClubResponse(club)),
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Buscar club por ID
   */
  async findById(id: string): Promise<ClubResponseDto> {
    const club = await this.clubModel
      .findById(id)
      .populate('administrators', 'firstName lastName email');
      
    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }

    return this.toClubResponse(club);
  }

  /**
   * Buscar clubes por ubicación (radio en km)
   */
  async findByLocation(
    latitude: number,
    longitude: number,
    radiusKm: number = 10
  ): Promise<ClubResponseDto[]> {
    const clubs = await this.clubModel.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: radiusKm * 1000, // Convertir km a metros
        },
      },
      status: EstadoClub.ACTIVO,
    });

    return clubs.map(club => this.toClubResponse(club));
  }

  /**
   * Actualizar club
   */
  async update(id: string, updateClubDto: UpdateClubDto): Promise<ClubResponseDto> {
    const club = await this.clubModel.findById(id);
    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }

    // Verificar nombre único si se está actualizando
    if (updateClubDto.name && updateClubDto.name !== club.name) {
      const existingClub = await this.clubModel.findOne({ name: updateClubDto.name });
      if (existingClub) {
        throw new ConflictException('Ya existe un club con ese nombre');
      }
    }

    Object.assign(club, updateClubDto);
    await club.save();

    return this.toClubResponse(club);
  }

  /**
   * Cambiar estado del club
   */
  async updateStatus(id: string, status: EstadoClub): Promise<ClubResponseDto> {
    const club = await this.clubModel.findById(id);
    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }

    club.status = status;
    await club.save();

    return this.toClubResponse(club);
  }

  /**
   * Agregar administrador al club
   */
  async addAdministrator(clubId: string, userId: string): Promise<ClubResponseDto> {
    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }

    if (!club.administrators.includes(userId as any)) {
      club.administrators.push(userId as any);
      await club.save();
    }

    return this.toClubResponse(club);
  }

  /**
   * Remover administrador del club
   */
  async removeAdministrator(clubId: string, userId: string): Promise<ClubResponseDto> {
    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }

    club.administrators = club.administrators.filter(
      admin => admin.toString() !== userId
    );
    await club.save();

    return this.toClubResponse(club);
  }

  /**
   * Actualizar estadísticas del club
   */
  async updateSeasonStats(
    clubId: string,
    totalMembers: number,
    totalMatches: number,
    totalTournaments: number,
    totalPoints: number
  ): Promise<void> {
    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }

    let currentStats = club.seasonStats.find(
      stat => stat.season === TEMPORADA_ACTUAL.año
    );

    if (!currentStats) {
      currentStats = {
        season: TEMPORADA_ACTUAL.año,
        totalMembers: 0,
        totalMatches: 0,
        totalTournaments: 0,
        membersByRank: new Map(),
        nationalRankingPosition: null,
        totalPoints: 0,
      };
      club.seasonStats.push(currentStats);
    }

    currentStats.totalMembers = totalMembers;
    currentStats.totalMatches = totalMatches;
    currentStats.totalTournaments = totalTournaments;
    currentStats.totalPoints = totalPoints;

    await club.save();
  }

  /**
   * Verificar si el club está operacional
   */
  async isOperational(id: string): Promise<boolean> {
    const club = await this.clubModel.findById(id);
    if (!club) {
      return false;
    }

    const now = new Date();
    const hasValidSubscription = club.status === EstadoClub.ACTIVO && 
                                 club.isSubscriptionActive && 
                                 (!club.subscriptionExpiresAt || club.subscriptionExpiresAt > now);

    const isNotRestricted = !club.restrictions?.isRestricted;

    return hasValidSubscription && isNotRestricted;
  }

  /**
   * Obtener clubes activos y operacionales
   */
  async findOperationalClubs(): Promise<ClubResponseDto[]> {
    const clubs = await this.clubModel.find({
      status: EstadoClub.ACTIVO,
      isSubscriptionActive: true,
      $or: [
        { subscriptionExpiresAt: { $gt: new Date() } },
        { subscriptionExpiresAt: { $exists: false } },
      ],
    });

    return clubs.map(club => this.toClubResponse(club));
  }

  /**
   * Convertir documento de club a DTO de respuesta
   */
  private toClubResponse(club: ClubDocument): ClubResponseDto {
    const currentStats = club.seasonStats.find(
      stat => stat.season === TEMPORADA_ACTUAL.año
    );

    return {
      _id: club._id.toString(),
      name: club.name,
      description: club.description,
      logo: club.logo,
      images: club.images,
      status: club.status,
      contact: club.contact,
      location: club.location,
      pricing: club.pricing,
      totalCourts: club.totalCourts,
      availableCourts: club.availableCourts,
      operatingHours: club.operatingHours,
      administrators: club.administrators,
      currentSeasonStats: currentStats || null,
      monthlySubscriptionFee: club.monthlySubscriptionFee,
      isSubscriptionActive: club.isSubscriptionActive,
      subscriptionExpiresAt: club.subscriptionExpiresAt,
      // Sistema de restricciones
      restrictions: club.restrictions || { 
        isRestricted: false, 
        activeRestrictions: [], 
        restrictionsHistory: [],
        restrictionsSummary: [],
        totalRestrictionsApplied: 0
      },
      // Métricas en tiempo real
      currentOpenMatches: club.currentOpenMatches,
      currentActiveTournaments: club.currentActiveTournaments,
      currentNationalRanking: club.currentNationalRanking,
      currentOccupiedCourts: club.currentOccupiedCourts,
      occupancyPercentage: club.occupancyPercentage,
      newMembersThisMonth: club.newMembersThisMonth,
      todayReservations: club.todayReservations,
      monthlyRevenue: club.monthlyRevenue,
      avgDailyReservations: club.avgDailyReservations,
      // allowTournaments y allowExternalPlayers removidos - siempre habilitados
      requireMembershipApproval: club.requireMembershipApproval,
      createdAt: club.createdAt,
      updatedAt: club.updatedAt,
    };
  }

  // ==================== MÉTODOS DE RESTRICCIONES ====================

  /**
   * Aplicar una restricción a un club
   */
  async applyRestriction(clubId: string, restrictionData: any): Promise<ClubResponseDto> {
    console.log(`🔍 applyRestriction llamado con:`, {
      clubId,
      restrictionDataReceived: restrictionData,
      typeReceived: restrictionData?.type,
      reasonReceived: restrictionData?.reason,
      appliedByReceived: restrictionData?.appliedBy
    });

    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }

    const restriction: ClubRestriction = {
      type: restrictionData.type as RestrictionType,
      reason: restrictionData.reason,
      appliedDate: new Date(),
      expiryDate: restrictionData.expiryDate ? new Date(restrictionData.expiryDate) : undefined,
      appliedBy: restrictionData.appliedBy,
      isActive: true,
      lastModified: new Date(),
    };

    // Validar que los campos críticos estén presentes
    if (!restriction.type || !restriction.reason || !restriction.appliedBy) {
      throw new Error(`Datos de restricción incompletos: type=${restriction.type}, reason=${restriction.reason}, appliedBy=${restriction.appliedBy}`);
    }

    console.log(`📝 Creando restricción:`, {
      type: restriction.type,
      reason: restriction.reason,
      appliedBy: restriction.appliedBy,
      appliedDate: restriction.appliedDate
    });

    // Inicializar restricciones si no existen
    if (!club.restrictions) {
      club.restrictions = {
        isRestricted: false,
        activeRestrictions: [],
        restrictionsHistory: [],
        restrictionsSummary: [],
        totalRestrictionsApplied: 0
      };
    }

    // Si ya existe una restricción del mismo tipo activa, desactivarla primero
    const existingRestrictionIndex = club.restrictions.activeRestrictions.findIndex(r => r.type === restriction.type);
    if (existingRestrictionIndex !== -1) {
      const existingRestriction = club.restrictions.activeRestrictions[existingRestrictionIndex];
      
      // Marcar como inactiva en el historial
      const now = new Date();
      existingRestriction.isActive = false;
      existingRestriction.removedDate = now;
      existingRestriction.removedBy = restriction.appliedBy;
      existingRestriction.removalReason = 'Reemplazada por nueva restricción del mismo tipo';
      existingRestriction.lastModified = now;

      // Actualizar el historial
      const historyIndex = club.restrictions.restrictionsHistory.findIndex(
        r => r.type === restriction.type && r.appliedDate.getTime() === existingRestriction.appliedDate.getTime()
      );
      if (historyIndex !== -1) {
        // NO usar spread operator - copiar campos explícitamente 
        club.restrictions.restrictionsHistory[historyIndex] = {
          type: existingRestriction.type,
          reason: existingRestriction.reason,
          appliedDate: existingRestriction.appliedDate,
          expiryDate: existingRestriction.expiryDate,
          appliedBy: existingRestriction.appliedBy,
          isActive: existingRestriction.isActive,
          removedDate: existingRestriction.removedDate,
          removedBy: existingRestriction.removedBy,
          removalReason: existingRestriction.removalReason,
          lastModified: existingRestriction.lastModified
        };
      }

      // Remover de restricciones activas
      club.restrictions.activeRestrictions.splice(existingRestrictionIndex, 1);
    }

    // Agregar nueva restricción
    club.restrictions.activeRestrictions.push(restriction);
    
    // Crear copia para el historial y validar antes de agregar
    // NO usar spread operator - copiar campos explícitamente para evitar pérdida de datos
    const historyEntry = {
      type: restriction.type,
      reason: restriction.reason,
      appliedDate: restriction.appliedDate,
      expiryDate: restriction.expiryDate,
      appliedBy: restriction.appliedBy,
      isActive: restriction.isActive,
      lastModified: restriction.lastModified
    };
    console.log(`📚 Agregando al historial:`, {
      type: historyEntry.type,
      reason: historyEntry.reason,
      appliedBy: historyEntry.appliedBy,
      appliedDate: historyEntry.appliedDate
    });
    
    club.restrictions.restrictionsHistory.push(historyEntry);
    club.restrictions.isRestricted = true;
    club.restrictions.totalRestrictionsApplied += 1;
    club.restrictions.lastRestrictionDate = restriction.appliedDate;

    // Actualizar resumen
    club.restrictions.restrictionsSummary = club.restrictions.activeRestrictions
      .filter(r => r.isActive)
      .map(r => r.type);

    await club.save();
    return this.toClubResponse(club);
  }

  /**
   * Quitar una restricción de un club (mantiene historial)
   */
  async removeRestriction(clubId: string, restrictionType: string, removedBy?: string, removalReason?: string): Promise<ClubResponseDto> {
    try {
      const club = await this.clubModel.findById(clubId);
      if (!club) {
        throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
      }

      // Verificar si el club tiene restricciones inicializadas
      if (!club.restrictions) {
        throw new NotFoundException(`El club no tiene sistema de restricciones inicializado`);
      }

      if (!club.restrictions.activeRestrictions || club.restrictions.activeRestrictions.length === 0) {
        throw new NotFoundException(`No hay restricciones activas en el club`);
      }

      // Buscar la restricción activa
      const restrictionIndex = club.restrictions.activeRestrictions.findIndex(r => r.type === restrictionType);
      if (restrictionIndex === -1) {
        throw new NotFoundException(`Restricción de tipo ${restrictionType} no encontrada en el club`);
      }

      // Obtener la restricción antes de removerla
      const restrictionToRemove = club.restrictions.activeRestrictions[restrictionIndex];

      // Preparar datos de auditoría
      const now = new Date();
      const defaultRemovedBy = removedBy && removedBy.trim() ? removedBy.trim() : 'system';
      const defaultRemovalReason = removalReason && removalReason.trim() ? removalReason.trim() : 'Restricción removida por administrador';

      // Inicializar restrictionsHistory si no existe
      if (!club.restrictions.restrictionsHistory) {
        club.restrictions.restrictionsHistory = [];
      }

      // Buscar si ya existe en el historial y actualizar
      const historyIndex = club.restrictions.restrictionsHistory.findIndex(
        h => h.type === restrictionType && 
             h.appliedDate && restrictionToRemove.appliedDate &&
             Math.abs(h.appliedDate.getTime() - restrictionToRemove.appliedDate.getTime()) < 1000 // 1 segundo de tolerancia
      );

      if (historyIndex !== -1) {
        // Actualizar la entrada existente en el historial
        console.log(`🔄 Actualizando entrada existente en historial[${historyIndex}]:`, {
          before: {
            type: club.restrictions.restrictionsHistory[historyIndex].type,
            reason: club.restrictions.restrictionsHistory[historyIndex].reason,
            appliedBy: club.restrictions.restrictionsHistory[historyIndex].appliedBy
          }
        });
        
        // NO usar spread operator - copiar campos explícitamente para evitar pérdida de datos
        const existingEntry = club.restrictions.restrictionsHistory[historyIndex];
        club.restrictions.restrictionsHistory[historyIndex] = {
          type: existingEntry.type,
          reason: existingEntry.reason,
          appliedDate: existingEntry.appliedDate,
          expiryDate: existingEntry.expiryDate,
          appliedBy: existingEntry.appliedBy,
          isActive: false,
          removedDate: now,
          removedBy: defaultRemovedBy,
          removalReason: defaultRemovalReason,
          lastModified: now
        };
        
        console.log(`✅ Entrada actualizada en historial[${historyIndex}]:`, {
          after: {
            type: club.restrictions.restrictionsHistory[historyIndex].type,
            reason: club.restrictions.restrictionsHistory[historyIndex].reason,
            appliedBy: club.restrictions.restrictionsHistory[historyIndex].appliedBy,
            isActive: club.restrictions.restrictionsHistory[historyIndex].isActive
          }
        });
      } else {
        // Si no está en el historial, crear una nueva entrada completa
        console.log(`➕ Creando nueva entrada en historial para restricción removida:`, {
          typeFromRemoved: restrictionToRemove.type,
          reasonFromRemoved: restrictionToRemove.reason,
          appliedByFromRemoved: restrictionToRemove.appliedBy
        });
        
        const completeHistoryEntry = {
          type: restrictionToRemove.type,
          reason: restrictionToRemove.reason,
          appliedDate: restrictionToRemove.appliedDate,
          expiryDate: restrictionToRemove.expiryDate,
          appliedBy: restrictionToRemove.appliedBy,
          isActive: false,
          removedDate: now,
          removedBy: defaultRemovedBy,
          removalReason: defaultRemovalReason,
          lastModified: now
        };
        
        console.log(`✅ Nueva entrada de historial creada:`, {
          type: completeHistoryEntry.type,
          reason: completeHistoryEntry.reason,
          appliedBy: completeHistoryEntry.appliedBy
        });
        
        club.restrictions.restrictionsHistory.push(completeHistoryEntry);
      }

      // Remover de restricciones activas
      club.restrictions.activeRestrictions.splice(restrictionIndex, 1);
      club.restrictions.lastRestrictionRemovalDate = now;

      // Si no quedan restricciones activas, marcar como no restringido
      if (club.restrictions.activeRestrictions.length === 0) {
        club.restrictions.isRestricted = false;
        club.restrictions.restrictionsSummary = [];
      } else {
        // Actualizar resumen
        club.restrictions.restrictionsSummary = club.restrictions.activeRestrictions
          .filter(r => r.isActive !== false)
          .map(r => r.type);
      }

      // Validar y limpiar historial antes de guardar
      console.log('Validando y limpiando historial antes de guardar...');
      if (club.restrictions.restrictionsHistory) {
        for (let index = 0; index < club.restrictions.restrictionsHistory.length; index++) {
          const item = club.restrictions.restrictionsHistory[index];
          
          console.log(`📋 Procesando historial[${index}]:`, {
            type: item.type,
            typeType: typeof item.type,
            reason: item.reason,
            reasonType: typeof item.reason,
            appliedBy: item.appliedBy,
            appliedByType: typeof item.appliedBy,
            isActive: item.isActive
          });
          
          // Asegurar que todos los campos requeridos estén definidos ANTES de validar
          // Usar verificaciones MUY específicas para evitar sobrescribir valores válidos
          
          // Para type: solo reemplazar si es realmente undefined o null (no string vacío)
          if (item.type === undefined || item.type === null) {
            console.log(`⚠️ Type es undefined/null en historial[${index}], corrigiendo...`);
            item.type = RestrictionType.MAINTENANCE;
          } else {
            console.log(`✅ Type válido en historial[${index}]: "${item.type}"`);
          }
          
          // Para reason: solo reemplazar si es undefined, null o string vacío
          if (item.reason === undefined || item.reason === null || item.reason === '') {
            console.log(`⚠️ Reason es undefined/null/empty en historial[${index}], corrigiendo...`);
            item.reason = 'Sin razón especificada';
          } else {
            console.log(`✅ Reason válido en historial[${index}]: "${item.reason}"`);
          }
          
          if (!item.appliedDate) {
            console.log(`⚠️ Falta appliedDate en historial[${index}], usando fecha actual`);
            item.appliedDate = new Date();
          }
          
          if (!item.lastModified) {
            console.log(`⚠️ Falta lastModified en historial[${index}], usando fecha actual`);
            item.lastModified = new Date();
          }
          
          // Asegurar que isActive esté definido (no undefined)
          if (item.isActive === undefined || item.isActive === null) {
            console.log(`Corrigiendo isActive para historial[${index}]: ${item.isActive} -> false`);
            item.isActive = false;
          }
          
          // Convertir appliedBy si es un ObjectId
          if (item.appliedBy && item.appliedBy.toString().match(/^[0-9a-fA-F]{24}$/)) {
            try {
              const appliedUser = await this.userModel.findById(item.appliedBy);
              if (appliedUser) {
                console.log(`👤 Convertido appliedBy de ObjectId ${item.appliedBy} a email: ${appliedUser.email}`);
                item.appliedBy = appliedUser.email;
              } else {
                console.log(`⚠️ Usuario no encontrado para ObjectId ${item.appliedBy}, usando valor por defecto`);
                item.appliedBy = 'admin.sistema@test.com';
              }
            } catch (error) {
              console.error(`❌ Error al buscar usuario ${item.appliedBy}:`, error);
              item.appliedBy = 'admin.sistema@test.com';
            }
          } else if (item.appliedBy === undefined || item.appliedBy === null || item.appliedBy === '') {
            console.log(`⚠️ Falta appliedBy en historial[${index}], usando valor por defecto`);
            item.appliedBy = 'admin.sistema@test.com';
          }
          
          // Verificar campos requeridos después de las correcciones
          if (!item.type || !item.reason || !item.appliedBy) {
            console.error(`❌ Error después de correcciones en historial[${index}]:`, {
              type: item.type,
              reason: item.reason,
              appliedBy: item.appliedBy,
              appliedDate: item.appliedDate,
              isActive: item.isActive
            });
            throw new Error(`Entrada de historial inválida en índice ${index}: faltan campos requeridos después de las correcciones`);
          } else {
            console.log(`✅ Historial[${index}] válido después de las correcciones`);
          }
        }
      }

      await club.save();
      return this.toClubResponse(club);
      
    } catch (error) {
      console.error('Error detallado en removeRestriction:', {
        message: error.message,
        stack: error.stack,
        clubId,
        restrictionType,
        removedBy,
        removalReason
      });
      
      // Re-lanzar excepciones conocidas
      if (error instanceof NotFoundException) {
        throw error;
      }
      
      // Para errores inesperados, lanzar un error con más detalle
      throw new Error(`Error interno al remover restricción: ${error.message}`);
    }
  }

  /**
   * Obtener las restricciones activas de un club
   */
  async getRestrictions(clubId: string) {
    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }

    return club.restrictions || { 
      isRestricted: false, 
      activeRestrictions: [], 
      restrictionsHistory: [],
      restrictionsSummary: [],
      totalRestrictionsApplied: 0
    };
  }

  /**
   * Obtener el historial completo de restricciones de un club
   */
  async getRestrictionsHistory(clubId: string) {
    const club = await this.clubModel.findById(clubId);
    if (!club) {
      throw new NotFoundException(`Club con ID ${clubId} no encontrado`);
    }

    if (!club.restrictions) {
      return {
        history: [],
        stats: {
          totalApplied: 0,
          totalRemoved: 0,
          currentActive: 0,
          lastRestrictionDate: null,
          lastRemovalDate: null
        },
        currentRestrictions: []
      };
    }

    // Calcular estadísticas
    const totalRemoved = club.restrictions.restrictionsHistory.filter(r => !r.isActive).length;
    const stats = {
      totalApplied: club.restrictions.totalRestrictionsApplied || 0,
      totalRemoved: totalRemoved,
      currentActive: club.restrictions.activeRestrictions.length,
      lastRestrictionDate: club.restrictions.lastRestrictionDate,
      lastRemovalDate: club.restrictions.lastRestrictionRemovalDate
    };

    return {
      history: club.restrictions.restrictionsHistory || [],
      stats: stats,
      currentRestrictions: club.restrictions.activeRestrictions.filter(r => r.isActive) || []
    };
  }
}
