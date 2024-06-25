import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@src/db/entities/company.entity';
import { CompanyService } from './services/company.service';
import { CompanyController } from './controller/company.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company])
    ],
    providers: [CompanyService],
    controllers: [CompanyController]
})
export class CompanyModule {}
