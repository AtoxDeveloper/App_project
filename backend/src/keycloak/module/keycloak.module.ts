import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { KeycloakService } from '../services/keycloak.service';
import { KeycloakController } from '../controller/keycloak.controller';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' }, // Puedes ajustar la expiración según tu necesidad
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [KeycloakService],
  controllers: [KeycloakController],
  exports: [KeycloakService],
})
export class KeycloakModule {}
