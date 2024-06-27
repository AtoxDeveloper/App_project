import { IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsOptional()
  ID?: string;

  @IsString()
  @IsOptional()
  Name?: string;
}
