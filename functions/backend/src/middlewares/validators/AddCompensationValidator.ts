import { body } from "express-validator";

import { Seniority } from "@/models/enums/Seniority";
import { JOB_FAMILY } from "@/constants/selectOptions/JOB_FAMILY";
import { ContractType } from "@/models/enums/ContractType";
import { HighestEducation } from "@/models/enums/HighestEducation";
import { OfficeArrangement } from "@/models/enums/OfficeArrangement";
import { AddCompensationRequestDto } from "@/models/dtos/AddCompensationRequestDto";

export function addCompensationValidator() {
    return [
        body("company" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("Company is required").trim(),
        body("officeCity" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("Office city is required"),
        body("jobTitle" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("Job title is required"),
        body("jobFocus" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("Job area/focus is required")
            .custom(async (value: string) => {
                const match = JOB_FAMILY.find(jobFamily => {
                    if ("options" in jobFamily && Array.isArray(jobFamily.options)) {
                        return jobFamily.options.find(option => option.value === value);
                    } else return "value" in jobFamily && jobFamily.value === value;
                });
                if (!match) {
                    throw new Error("Invalid job family");
                }
            }),
        body("arrangement" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("arrangement is required")
            .custom(async (value: OfficeArrangement) => {
                if (!Object.values<OfficeArrangement>(OfficeArrangement).includes(value)) {
                    throw new Error("Invalid office arrangement");
                }
            }),
        body("yearsOfExperience" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .isInt({ min: 0 }).withMessage("Years of experience must be a positive integer")
            .notEmpty().withMessage("yearsOfExperience is required"),
        body("seniority" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("seniority is required")
            .custom(async (value: Seniority) => {
                if (!Object.values<Seniority>(Seniority).includes(value)) {
                    throw new Error("Invalid seniority");
                }
            }),
        body("contractType" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("contractType is required")
            .custom(async (value: ContractType) => {
                if (!Object.values<ContractType>(ContractType).includes(value)) {
                    throw new Error("Invalid contract type");
                }
            }),
        body("yearOfCompensation" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .isInt().withMessage("Year of compensation must be a positive integer")
            .notEmpty().withMessage("Year of compensation is required"),
        body("perks" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .optional(),
        body("baseSalary" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .isInt({ min: 1 }).withMessage("Base salary must be a positive integer")
            .notEmpty().withMessage("Base salary is required"),
        body("signOnBonus" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .optional()
            .isInt({ min: 0 }).withMessage("Sign on bonus must be a positive integer"),
        body("annualBonus" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .optional()
            .isInt({ min: 0 }).withMessage("Annual bonus must be a positive integer"),
        body("offerStatus" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty().withMessage("Offer status is required"),
        body("compensationDetails" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .optional(),
        body("highestEducation" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .optional()
            .custom(async (value: HighestEducation) => {
                if (!Object.values<HighestEducation>(HighestEducation).includes(value)) {
                    throw new Error("Invalid education");
                }
            }),
        body("gender" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .optional(),
        body("otherInfo" as keyof AddCompensationRequestDto)
            .customSanitizer((value: string) => value.trim())
            .optional()

    ];
}