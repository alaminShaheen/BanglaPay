import "module-alias/register";
import { faker } from "@faker-js/faker";
import { CompanyRepository } from "@/repositories/CompanyRepository";
import { initDatabase } from "../database";

async function CompanySeed() {
    try {
        const existingCompanies = await CompanyRepository.getCompanies();
        const uniqueDummyCompanies = Array.from({ length: 50 }, () => faker.company.name()).filter((dummyCompany) => {
            return !existingCompanies.find((existingCompany) => {
                return existingCompany.name === dummyCompany;
            });
        });

        for (let i = 0; i < uniqueDummyCompanies.length; i++) {
            await CompanyRepository.createCompany({ name: uniqueDummyCompanies[i] });
        }

        logging.info(`Added ${uniqueDummyCompanies.length} company records`);
    } catch (error) {
        logging.error(error);
    }
}

initDatabase();
void CompanySeed();