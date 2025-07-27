import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubsService } from './clubs.service';
import { ClubsController } from './clubs.controller';
import { Club, ClubSchema } from './club.schema';
import { Usuario, EsquemaUsuario } from '../users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Club.name, schema: ClubSchema },
      { name: Usuario.name, schema: EsquemaUsuario }
    ]),
  ],
  controllers: [ClubsController],
  providers: [ClubsService],
  exports: [ClubsService], // Exportar para usar en otros módulos
})
export class ClubsModule {}
