import { IsOptional, IsString, IsUrl, IsEmail } from 'class-validator';

export class CreateParticipantDto {
  @IsString()
  @IsOptional()
  ID?: string;

  @IsString()
  @IsOptional()
  Name?: string;

  @IsUrl()
  @IsOptional()
  LogoURL?: string;

  @IsString()
  @IsOptional()
  Address?: string;

  @IsUrl()
  @IsOptional()
  WebUrl?: string;

  @IsEmail()
  @IsOptional()
  Email?: string;
}
