import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Módulos implementados
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClubsModule } from './clubs/clubs.module';

@Module({
  imports: [
    // Configuración de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Conexión a MongoDB
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/padelhub'
    ),

    // Módulos de la aplicación implementados
    AuthModule,
    UsersModule,
    ClubsModule,

    // Módulos pendientes de implementar
    // PartidosModule,
    // TorneosModule,
    // RankingsModule,
    // MonederoModule,
    // ChatModule,
    // NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
