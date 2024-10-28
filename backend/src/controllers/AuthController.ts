import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

import { AuthService } from "@/services/AuthService";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";
import { LoginRequestDto } from "@/models/dtos/LoginRequestDto";

async function loginHandler(request: Request<{}, {}, LoginRequestDto>, response: Response, next: NextFunction) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        // TODO: Throw AppValidationError
        // throw new AppValidationError(400, "Login form errors", {})
        response.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const loginResponse = await AuthService.login(request.body, response);
        response.status(200).json(loginResponse);
    } catch (error) {
        next(error);
    }
}

async function registerHandler(request: Request<{}, {}, RegisterUserDto>, response: Response, next: NextFunction) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        await AuthService.register(request.body);
        response.sendStatus(200);
        return;
    } catch (error: any) {
        next(error);
    }
}

async function registerPasswordReset(request: Request<{}, {}, RegisterUserDto>, response: Response, next: NextFunction) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        await AuthService.resetPassword(request.body);
        response.sendStatus(200);
        return;
    } catch (error: any) {
        next(error);
    }
}

export const AuthController = {
    loginHandler,
    registerHandler,
    registerPasswordReset,
};