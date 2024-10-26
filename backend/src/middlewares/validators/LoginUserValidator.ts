import { body } from "express-validator";
import { LoginRequestUserDto } from "@/models/dtos/LoginRequestUserDto";

export function loginUserValidator() {
    return [
        body("email" as keyof LoginRequestUserDto)
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is invalid."),
        body("password" as keyof LoginRequestUserDto).notEmpty().withMessage("Password is required")
    ];
}