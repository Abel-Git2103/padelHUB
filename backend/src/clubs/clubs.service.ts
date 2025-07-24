import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Club, ClubDocument } from './club.schema';
import { CreateClubDto, UpdateClubDto, ClubResponseDto } from './dto/club.dto';
import { EstadoClub, TEMPORADA_ACTUAL } from '../common/enums';

@Injectable()
export class ClubsService {
  constructor(
    @InjectModel(Club.name) private clubModel: Model<ClubDocument>,
  ) {}

  /**
   * Crear un nuevo club
   */
  async create(createClubDto: CreateClubDto): Promise<ClubResponseDto> {
    // Verificar si el nombre ya existe
    const existingClub = await this.clubModel.findOne({ name: createClubDto.name });
    if (existingClub) {
      throw new ConflictException('Ya existe un club con ese nombre');
    }

    const createdClub = new this.clubModel(createClubDto);
    await createdClub.save();

    return this.toClubResponse(createdClub);
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

    return (club as any).isOperational();
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
      id: club._id.toString(),
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
      allowTournaments: club.allowTournaments,
      allowExternalPlayers: club.allowExternalPlayers,
      requireMembershipApproval: club.requireMembershipApproval,
      createdAt: club.createdAt,
      updatedAt: club.updatedAt,
    };
  }
}
