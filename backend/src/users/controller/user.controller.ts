import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/user.service';
import { User } from '@src/db/entities/user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('status')
    getStatus() {
      return { status: 'ok' };
    }
}
