import { body } from "express-validator";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";

export function registerUserValidator() {
    return [
        body("email" as keyof RegisterUserDto)
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is invalid."),
        body("firstname" as keyof RegisterUserDto).notEmpty().withMessage("First name is required"),
        body("lastname" as keyof RegisterUserDto).notEmpty().withMessage("Last name is required"),
        body("password" as keyof RegisterUserDto).notEmpty().withMessage("Password is required")
    ];
}