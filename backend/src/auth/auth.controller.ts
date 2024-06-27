import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    register(@Body() registerDto: RegisterUserDto) {
       return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    profile() {
        return 'profile';
    }
}
