import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@src/users/services/user.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { comparePasswords } from '@src/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterUserDto) {
    return await this.userService.create(registerDto);
  }

  async login({ username, email, password }: LoginDto) {
    let user;

    if (username) {
      user = await this.userService.findOnebyUsername(username);
    } else if (email) {
      user = await this.userService.findOnebyEmail(email);
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.Password) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const isPasswordValid = comparePasswords(password, user.Password);

    if(!isPasswordValid){
        throw new UnauthorizedException('Password is incorrect');
    }

    const payload = { email:user.Email };

    const token = await this.jwtService.signAsync(payload);
    const userInfo = { 
      idUser: user.IdUser, 
      username: user.Username, 
      email: user.Email,
      name: user.Name,
      lastname: user.Lastname
    }
    return {
        token,
        userInfo
    };
  }
}
