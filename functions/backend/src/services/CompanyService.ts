import { Company } from "@/models/Company";
import { CompanyRepository } from "@/repositories/CompanyRepository";
import { AddCompanyRequestDto } from "@/models/dtos/AddCompanyRequestDto";

async function getAllCompanies(): Promise<Company[]> {
    try {
        return await CompanyRepository.getCompanies();
    } catch (error) {
        throw error;
    }
}

async function addCompany(companyInfo: AddCompanyRequestDto): Promise<Company> {
    try {
        return await CompanyRepository.createCompany(companyInfo);
    } catch (error) {
        throw error;
    }
}

export const CompanyService = {
    getAllCompanies,
    addCompany,
};