import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from '@src/db/entities/participant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParticipantService {
    constructor(
        @InjectRepository(Participant) private participantRepo: Repository<Participant>
    ){}

    async find() {
        return `this action return all participant`;
    }
}

