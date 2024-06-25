import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '@src/db/entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company) private companyRepo: Repository<Company>
    ){}

    async findAll(): Promise<Company[]> {
        return await this.companyRepo.find();
    }

    async findCompanyById(id: number): Promise<Company> {
        const company = await this.companyRepo.findOne({ where: {id} });
        return company!;
    }

    async createCompany(company: Company): Promise<Company> {
        return await this.companyRepo.save(company);
    }

    async updateCompany(id:number, updateCompany: Partial<Company>): Promise<void> {
        await this.companyRepo.update(id, updateCompany);
    }

    async remove(id: number): Promise<void> {
        await this.companyRepo.delete(id);
    }

}

