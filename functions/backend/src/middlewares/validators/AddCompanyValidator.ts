import { body } from "express-validator";
import { AddCompanyRequestDto } from "@/models/dtos/AddCompanyRequestDto";

export function addCompanyValidator() {
    return [
        body("name" as keyof AddCompanyRequestDto)
            .customSanitizer((value: string) => value.trim())
            .notEmpty()
            .withMessage("Company name is required.")
    ];
}