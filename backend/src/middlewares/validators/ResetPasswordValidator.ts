import { body } from "express-validator";

import { ResetPasswordRequestDto } from "@/models/dtos/ResetPasswordRequestDto";

export function resetPasswordValidator() {
    return [
        body("email" as keyof ResetPasswordRequestDto)
            .notEmpty()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Email is invalid.")
    ];
}