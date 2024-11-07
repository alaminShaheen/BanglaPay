import { v4 as uuidv4 } from "uuid";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { getDatabaseInstance } from "../database";

import { Company } from "@/models/Company";
import { AppError } from "@/errors/AppError";
import { DATABASE_CONSTANTS } from "@/constants/databaseConstants";
import { AddCompanyRequestDto } from "@/models/dtos/AddCompanyRequestDto";


async function createCompany(companyInfo: AddCompanyRequestDto) {
    try {
        const companiesTable = await getCompanyTable();

        const isCompanyExisting = await findCompanyByName(companyInfo.name);

        if (isCompanyExisting) {
            throw new AppError(400, "Company already exists");
        }

        const companyWithId: Company = { id: uuidv4(), name: companyInfo.name };
        const companyRecord: GoogleSpreadsheetRow<Company> = await companiesTable.addRow(companyWithId);
        return serializeCompanyToJson(companyRecord) as Company;
    } catch (error: any) {
        throw error;
    }
}

async function getCompanyTable() {
    try {
        const databaseInstance = getDatabaseInstance();
        await databaseInstance.loadInfo();
        return databaseInstance.sheetsByTitle[DATABASE_CONSTANTS.COMPANIES_TABLE];
    } catch (error) {
        throw error;
    }
}

async function findCompanyById(companyId: string) {
    const companiesTable = await getCompanyTable();

    const companyRows = await companiesTable.getRows<Company>();

    return companyRows.find(companyRow => companyRow.get("id") === companyId) ?? null;
}

async function findCompanyByName(companyName: string) {
    const companiesTable = await getCompanyTable();

    const companyRows = await companiesTable.getRows<Company>();

    return companyRows.find(companyRow => companyRow.get("name") === companyName) ?? null;
}

async function getCompany(companyId: string) {
    try {
        const company = await findCompanyById(companyId);

        if (!company) {
            return null;
        }
        return serializeCompanyToJson(company);
    } catch (error: any) {
        throw error;
    }
}

async function getCompanies(): Promise<Company[]> {
    try {
        const companiesTable = await getCompanyTable();

        const companyRows = await companiesTable.getRows<Company>();

        return serializeCompanyToJson(companyRows) as Company[];
    } catch (error: any) {
        throw error;
    }
}

function serializeCompanyToJson(companyInfo: GoogleSpreadsheetRow<Company> | GoogleSpreadsheetRow<Company>[]): Company | Company[] {
    if (Array.isArray(companyInfo)) {
        return companyInfo.map(company => ({ id: company.get("id"), name: company.get("name") }));
    } else return { name: companyInfo.get("name"), id: companyInfo.get("id") };
}

async function updateCompany(updatedCompanyInfo: Company) {
    try {
        const company = await findCompanyById(updatedCompanyInfo.id);

        if (!company) {
            return null;
        }

        company.assign(updatedCompanyInfo);

        await company.save();

        return serializeCompanyToJson(company);
    } catch (error: any) {
        throw error;
    }
}

export const CompanyRepository = {
    createCompany,
    getCompanyTable,
    getCompany,
    getCompanies,
    updateCompany
};