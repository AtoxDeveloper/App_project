import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoggerModule } from "./shared/logger/logger.module";
import { AuthModule } from "./auth/auth.module";
import { ParticipantModule } from "./participant/module/participant.module";
import { KeycloakModule } from './keycloak/module/keycloak.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env'
      })],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/db/entities/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNC'),
        retryDelay: 3000,
        retryAttempts: 5,
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    AuthModule,
    ParticipantModule,
    KeycloakModule
  ]
})
export class AppModule {}
