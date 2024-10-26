import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

import { AuthService } from "@/services/AuthService";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";
import { LoginRequestUserDto } from "@/models/dtos/LoginRequestUserDto";

async function loginHandler(request: Request<{}, {}, LoginRequestUserDto>, response: Response, next: NextFunction) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const user = await AuthService.login(request.body, response);
        response.status(200).json(user);
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