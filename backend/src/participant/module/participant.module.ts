import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from '@src/db/entities/participant.entity';
import { ParticipantController } from '../controller/participant.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Participant])
    ],
    controllers: [ParticipantController]
})
export class ParticipantModule {}
