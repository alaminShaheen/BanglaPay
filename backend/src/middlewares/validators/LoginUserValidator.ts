import { body } from "express-validator";
import { LoginRequestDto } from "@/models/dtos/LoginRequestDto";

export function loginUserValidator() {
    return [
        body("email" as keyof LoginRequestDto)
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is invalid."),
        body("password" as keyof LoginRequestDto).notEmpty().withMessage("Password is required")
    ];
}