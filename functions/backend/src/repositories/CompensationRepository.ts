import { v4 as uuidv4 } from "uuid";
import { GoogleSpreadsheetRow } from "google-spreadsheet";
import { getDatabaseInstance } from "../database";

import { Compensation } from "@/models/Compensation";
import { DATABASE_CONSTANTS } from "@/constants/databaseConstants";
import { AddCompensationRequestDto } from "@/models/dtos/AddCompensationRequestDto";
import { JOB_FAMILY } from "@/constants/selectOptions/JOB_FAMILY";
import { SelectOption } from "@/models/SelectOption";


async function createCompensation(compensation: AddCompensationRequestDto) {
    try {
        const compensationTable = await getCompensationTable();

        const jobFamilies = JOB_FAMILY.reduce((values, currentValue) => {
            if ("options" in currentValue && Array.isArray(currentValue.options)) {
                return values.concat(currentValue.options);
            } else {
                values.push(currentValue as SelectOption<string>);
            }
            return values;
        }, [] as SelectOption<string>[]);

        const jobFocus = jobFamilies.find(jobFamily => jobFamily.value === compensation.jobFocus)!.label;

        const compensationWithId: Compensation = {
            id: uuidv4(),
            addedAt: new Date().toISOString(), ...compensation,
            jobFocus
        };
        const compensationRecord: GoogleSpreadsheetRow<Compensation> = await compensationTable.addRow(compensationWithId);
        return serializeCompensationToJson(compensationRecord) as Compensation;
    } catch (error: any) {
        throw error;
    }
}

async function getCompensationTable() {
    try {
        const databaseInstance = getDatabaseInstance();
        await databaseInstance.loadInfo();
        return databaseInstance.sheetsByTitle[DATABASE_CONSTANTS.COMPENSATION_TABLE];
    } catch (error) {
        logging.error(error);
        throw error;
    }
}

async function findCompensationRecord(compensationId: string) {
    const compensationTable = await getCompensationTable();

    const compensationRows = await compensationTable.getRows<Compensation>();

    return compensationRows.find(compensationRow => compensationRow.get("id") === compensationId) ?? null;
}

async function getCompensation(compensationId: string) {
    try {
        const compensation = await findCompensationRecord(compensationId);

        if (!compensation) {
            return null;
        }
        return serializeCompensationToJson(compensation);
    } catch (error: any) {
        throw error;
    }
}

async function getCompensations(): Promise<Compensation[]> {
    try {
        const compensationsTable = await getCompensationTable();

        const compensationRows = await compensationsTable.getRows<Compensation>();

        const unsortedCompensations = serializeCompensationToJson(compensationRows) as Compensation[];

        return unsortedCompensations.sort((compensationA, compensationB) => new Date(compensationB.addedAt).getTime() - new Date(compensationA.addedAt).getTime());
    } catch (error: any) {
        throw error;
    }
}

function serializeCompensationToJson(compensationInfo: GoogleSpreadsheetRow<Compensation> | GoogleSpreadsheetRow<Compensation>[]): Compensation | Compensation[] {
    if (Array.isArray(compensationInfo)) {
        return compensationInfo.map(compensation => ({
            id: compensation.get("id"),
            company: compensation.get("company"),
            officeCity: compensation.get("officeCity"),
            jobTitle: compensation.get("jobTitle"),
            jobFocus: compensation.get("jobFocus"),
            arrangement: compensation.get("arrangement"),
            yearsOfExperience: parseInt(compensation.get("yearsOfExperience")),
            seniority: compensation.get("seniority"),
            contractType: compensation.get("contractType"),
            yearOfCompensation: parseInt(compensation.get("yearOfCompensation")),
            perks: compensation.get("perks"),
            baseSalary: parseInt(compensation.get("baseSalary")),
            signOnBonus: parseInt(compensation.get("signOnBonus")),
            annualBonus: parseInt(compensation.get("annualBonus")),
            offerStatus: compensation.get("offerStatus"),
            compensationDetails: compensation.get("compensationDetails"),
            highestEducation: compensation.get("highestEducation"),
            gender: compensation.get("gender"),
            otherInfo: compensation.get("otherInfo"),
            addedAt: compensation.get("addedAt")
        }));
    } else return {
        id: compensationInfo.get("id"),
        company: compensationInfo.get("company"),
        officeCity: compensationInfo.get("officeCity"),
        jobTitle: compensationInfo.get("jobTitle"),
        jobFocus: compensationInfo.get("jobFocus"),
        arrangement: compensationInfo.get("arrangement"),
        yearsOfExperience: parseInt(compensationInfo.get("yearsOfExperience")),
        seniority: compensationInfo.get("seniority"),
        contractType: compensationInfo.get("contractType"),
        yearOfCompensation: parseInt(compensationInfo.get("yearOfCompensation")),
        perks: compensationInfo.get("perks"),
        baseSalary: parseInt(compensationInfo.get("baseSalary")),
        signOnBonus: parseInt(compensationInfo.get("signOnBonus")),
        annualBonus: parseInt(compensationInfo.get("annualBonus")),
        offerStatus: compensationInfo.get("offerStatus"),
        compensationDetails: compensationInfo.get("compensationDetails"),
        highestEducation: compensationInfo.get("highestEducation"),
        gender: compensationInfo.get("gender"),
        otherInfo: compensationInfo.get("otherInfo"),
        addedAt: compensationInfo.get("addedAt")
    };
}

async function updateCompensation(updatedCompensationInfo: Compensation) {
    try {
        const compensation = await findCompensationRecord(updatedCompensationInfo.id);

        if (!compensation) {
            return null;
        }

        compensation.assign(updatedCompensationInfo);

        await compensation.save();

        return serializeCompensationToJson(compensation);
    } catch (error: any) {
        throw error;
    }
}

export const CompensationRepository = {
    createCompensation,
    getCompensation,
    getCompensations,
    updateCompensation,
    getCompensationTable
};