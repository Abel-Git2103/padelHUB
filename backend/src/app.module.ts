import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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

    // Módulos de la aplicación (se agregarán progresivamente)
    // AuthModule,
    // UsuariosModule,
    // ClubesModule,
    // TorneosModule,
    // PartidosModule,
    // RankingsModule,
    // MonederoModule,
    // ChatModule,
    // NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
