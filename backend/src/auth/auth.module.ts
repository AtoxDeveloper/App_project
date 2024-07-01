import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@src/users/modules/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@src/constants/jwt.constant';
import { KeycloakModule } from '@src/keycloak/module/keycloak.module';

@Module({
  imports:[
    UsersModule,
    KeycloakModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
