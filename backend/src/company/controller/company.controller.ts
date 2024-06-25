import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Patch } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { Company } from '@src/db/entities/company.entity';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Get()
    async findAll(): Promise<Company[]> {
        return await this.companyService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Company> {
        const user = await this.companyService.findCompanyById(id);
        if (!user) {
            throw new NotFoundException(`Company with id ${id} not found`);
        }
        return user;
    }

    @Post()
    async create(@Body() company: Company): Promise<Company> {
        return await this.companyService.createCompany(company);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateCompany: Partial<Company>): Promise<void> {
        const company = await this.companyService.findCompanyById(id);
        if (!company) {
            throw new NotFoundException(`Company with id ${id} not found`);
        }
        await this.companyService.updateCompany(id, updateCompany);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const company = await this.companyService.findCompanyById(id);
        if (!company) {
            throw new NotFoundException(`Company with id ${id} not found`);
        }
        await this.companyService.remove(id);
    }

}
