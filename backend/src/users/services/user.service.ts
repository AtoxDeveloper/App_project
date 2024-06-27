import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/db/entities/user.entity';
import { Repository } from 'typeorm';
const { v4: uuidv4 } = require('uuid');
import { RegisterUserDto } from '@src/auth/dto/register.dto';
import { encodePassword } from '@src/utils/bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ){}

    async findAll() {
        return `this action return all users`;
    }

    async create(createUserDto: RegisterUserDto): Promise<User> {
        const user = new User();
        user.Username = createUserDto.username;
        user.Email = createUserDto.email;
        user.Name = createUserDto.firstName;
        user.Lastname = createUserDto.lastName;
        user.Password = await encodePassword(createUserDto.password);
        user.IdUser = this.generateUUID();

        return await this.userRepo.save(user);
    }

    async findOnebyUsername(username: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ Username: username });
        return user!;
    }

    async findOnebyEmail(email: string): Promise<User> {
        const user = await this.userRepo.findOneBy({ Email: email });
        return user!;
    }

    private generateUUID(): string {
        return uuidv4(); 
    }
}
