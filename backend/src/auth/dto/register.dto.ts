import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(3)
  username: string;
 
  @Transform(({ value }) => value.trim())
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string; 

  constructor(username: string, email: string, firstName: string, lastName: string, password: string) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}
