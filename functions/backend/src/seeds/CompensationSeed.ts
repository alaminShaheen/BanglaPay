import "module-alias/register";
import { initDatabase } from "../database";
import { CompensationRepository } from "@/repositories/CompensationRepository";
import { faker } from "@faker-js/faker";
import { AddCompensationRequestDto } from "@/models/dtos/AddCompensationRequestDto";
import { JOB_FAMILY } from "@/constants/selectOptions/JOB_FAMILY";
import { SelectOption } from "@/models/SelectOption";
import { OfficeArrangement } from "@/models/enums/OfficeArrangement";
import { Gender } from "@/models/enums/Gender";
import { ContractType } from "@/models/enums/ContractType";
import { HighestEducation } from "@/models/enums/HighestEducation";
import { OfferStatus } from "@/models/enums/OfferStatus";
import { Seniority } from "@/models/enums/Seniority";
import { CompanyRepository } from "@/repositories/CompanyRepository";

export async function CompensationSeed(recordLength: number) {
    try {
        const companies = await CompanyRepository.getCompanies();
        const jobFamilies = JOB_FAMILY.reduce((values, currentValue) => {
            if ("options" in currentValue && Array.isArray(currentValue.options)) {
                return values.concat(currentValue.options.map(option => option.value));
            } else {
                values.push((currentValue as SelectOption<string>).value);
            }
            return values;
        }, [] as string[]);

        const dummyCompensations: AddCompensationRequestDto[] = Array.from({ length: recordLength }, () => {
            return {
                company: companies[faker.number.int(companies.length - 1)].name,
                jobFocus: jobFamilies[faker.number.int(jobFamilies.length - 1)],
                jobTitle: faker.person.jobTitle(),
                officeCity: faker.location.city(),
                annualBonus: faker.datatype.boolean({probability: 0.5}) ? faker.number.int({ min: 2000, max: 100000, multipleOf: 1000 }) : undefined,
                compensationDetails: faker.lorem.words(18),
                arrangement: Object.values(OfficeArrangement)[faker.number.int(Object.values(OfficeArrangement).length - 1)],
                baseSalary: faker.number.int({ min: 10000, max: 200000, multipleOf: 10000 }),
                gender: faker.datatype.boolean({probability: 0.5}) ? Object.values(Gender)[faker.number.int(Object.values(Gender).length - 1)] : undefined,
                contractType: Object.values(ContractType)[faker.number.int(Object.values(ContractType).length - 1)],
                highestEducation: faker.datatype.boolean({probability: 0.5}) ? Object.values(HighestEducation)[faker.number.int(Object.values(HighestEducation).length - 1)] : undefined,
                offerStatus: Object.values(OfferStatus)[faker.number.int(Object.values(OfferStatus).length - 1)],
                perks: faker.datatype.boolean({probability: 0.5}) ? faker.lorem.words(20) : undefined,
                otherInfo: faker.datatype.boolean({probability: 0.5}) ? faker.lorem.words(25) : undefined,
                yearOfCompensation: faker.date.birthdate({
                    mode: "year",
                    min: new Date().getFullYear(),
                    max: 2030
                }).getFullYear(),
                seniority: Object.values(Seniority)[faker.number.int(Object.values(Seniority).length - 1)],
                signOnBonus: faker.datatype.boolean({probability: 0.5}) ? faker.number.int({ min: 2000, max: 100000, multipleOf: 1000 }) : undefined,
                yearsOfExperience: faker.number.int({ min: 0, max: 20 })
            };
        });

        for (let i = 0; i < dummyCompensations.length; i++) {
            await CompensationRepository.createCompensation(dummyCompensations[i]);
        }

        logging.info(`Added ${dummyCompensations.length} compensation records`);

    } catch (error) {
        logging.error(error);

    }
}

initDatabase();
void CompensationSeed(23);