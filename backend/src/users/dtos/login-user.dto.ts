import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  user?: string;

  @IsString()
  pass?: string;
}
