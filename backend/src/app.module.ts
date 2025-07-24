import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClubesModule } from './clubes/clubes.module';
import { TorneosModule } from './torneos/torneos.module';
import { PartidosModule } from './partidos/partidos.module';
import { RankingsModule } from './rankings/rankings.module';
import { MonederoModule } from './monedero/monedero.module';
import { ChatModule } from './chat/chat.module';
import { NotificationsModule } from './notifications/notifications.module';

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

    // Módulos de la aplicación
    AuthModule,
    UsuariosModule,
    ClubesModule,
    TorneosModule,
    PartidosModule,
    RankingsModule,
    MonederoModule,
    ChatModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
