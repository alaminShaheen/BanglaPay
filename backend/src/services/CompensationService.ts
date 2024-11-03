import { SENIORITY } from "@/constants/selectOptions/SENIORITY";
import { EDUCATION } from "@/constants/selectOptions/EDUCATION";
import { JOB_FAMILY } from "@/constants/selectOptions/JOB_FAMILY";
import { Compensation } from "@/models/Compensation";
import { CONTRACT_TYPE } from "@/constants/selectOptions/CONTRACT_TYPE";
import { FormOptionsResponseDto } from "@/models/dtos/FormOptionsResponseDto";
import { CompensationRepository } from "@/repositories/CompensationRepository";
import { AddCompensationRequestDto } from "@/models/dtos/AddCompensationRequestDto";

function getFormOptions(): FormOptionsResponseDto {
    return {
        contractType: CONTRACT_TYPE,
        education: EDUCATION,
        jobFamily: JOB_FAMILY,
        seniority: SENIORITY
    } as FormOptionsResponseDto;
}

async function addCompensation(compensationInfo: AddCompensationRequestDto): Promise<Compensation> {
    try {
        return await CompensationRepository.createCompensation(compensationInfo);
    } catch (error) {
        throw error;
    }
}


export const CompensationService = {
    getFormOptions
};