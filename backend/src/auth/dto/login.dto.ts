import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, ValidateIf, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @ValidateIf(o => !o.username)
  @IsEmail()
  @IsOptional()
  @MinLength(3)
  email?: string;

  @ValidateIf(o => !o.email)
  @IsString()
  @IsOptional()
  @MinLength(3)
  username?: string;

  @Transform(({value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  constructor(password: string, email?: string, username?: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
