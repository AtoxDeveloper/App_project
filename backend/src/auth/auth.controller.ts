import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { KeycloakService } from '@src/keycloak/services/keycloak.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly keycloakService: KeycloakService
    ) {}

    @Post('register')
    register(@Body() registerDto: RegisterUserDto) {
       return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('/active')
    async introspectToken(@Body() body: { token: string }) {
      try {
        const { token } = body;
        const activeUser = await this.keycloakService.getActiveUser(token);
        return { active: activeUser.active }; 
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    @UseGuards(AuthGuard)
    @Get('verify')
    verify() {
        return { valid: true };
    }
}
