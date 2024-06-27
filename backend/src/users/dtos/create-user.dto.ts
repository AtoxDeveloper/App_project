import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  IdUser?: string;

  @IsString()
  @IsOptional()
  Username?: string;

  @IsString()
  @IsOptional()
  Name?: string;

  @IsString()
  @IsOptional()
  Lastname?: string;

  @IsUUID()
  @IsOptional()
  ParticipantID?: string;
}
