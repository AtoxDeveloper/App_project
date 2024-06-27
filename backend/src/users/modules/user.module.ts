import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/db/entities/user.entity';
import { UsersController } from '../controller/user.controller';
import { UsersService } from '../services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
