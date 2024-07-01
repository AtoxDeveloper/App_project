import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { KeycloakService } from '../services/keycloak.service';
import { AuthGuard } from '@src/auth/auth.guard';

@Controller('keycloak')
export class KeycloakController {
  constructor(private readonly keycloakService: KeycloakService) {}

  @Post('/token')
  async getTokenByUsernamePassword(@Body() body: { username: string; password: string }) {
    try {
      const { username, password } = body;
      return await this.keycloakService.getTokenByUsernamePassword(username, password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
   
  @Post('/active')
  async introspectToken(@Body() body: { token: string }) {
    try {
      const { token } = body;
      return await this.keycloakService.getActiveUser(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
