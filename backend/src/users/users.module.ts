import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Usuario, EsquemaUsuario } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Usuario.name, schema: EsquemaUsuario }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exportar para usar en otros módulos
})
export class UsersModule {}
