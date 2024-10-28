import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup,
    User
} from "firebase/auth";
import { Response } from "express";
import { FirebaseError } from "firebase/app";
import { getAuth as firebaseAdminAuth } from "firebase-admin/auth";

import { AppError } from "@/errors/AppError";
import { AuthRepository } from "@/repositories/AuthRepository";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";
import { LoginRequestDto } from "@/models/dtos/LoginRequestDto";
import { LoginResponseDto } from "@/models/dtos/LoginResponseDto";
import { AppValidationError } from "@/errors/AppValidationError";
import { ResetPasswordRequestDto } from "@/models/dtos/ResetPasswordRequestDto";

async function login(userLoginInfo: LoginRequestDto, response: Response): Promise<LoginResponseDto> {
    try {
        const userInfo = await firebaseAdminAuth().getUserByEmail(userLoginInfo.email);

        if (!userInfo.emailVerified) {
            throw new AppError(400, "Email verification required");
        }

        const firebaseAuth = getAuth();
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, userLoginInfo.email, userLoginInfo.password);

        const user = await AuthRepository.getUser(userCredential.user.uid);

        if (!user) {
            throw new AppError(400, "Invalid credentials provided");
        }

        const accessToken = await generateCustomToken(user.id);
        return {
            user,
            accessToken
        };
    } catch (error) {
        if (error instanceof FirebaseError) {
            if (error.code === "auth/invalid-email") {
                throw new AppValidationError(400, "Login form errors", { "email": "Invalid email" });
            } else if (error.code === "auth/invalid-credential") {
                throw new AppError(400, "Invalid credentials provided");
            } else throw error;
        }
        throw error;
    }
}

async function generateCustomToken(userId: string): Promise<string> {
    try {
        return await firebaseAdminAuth().createCustomToken(userId);
    } catch (error) {
        throw error;
    }
}

async function register(userInfo: RegisterUserDto) {
    try {
        const firebaseAuth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, userInfo.email, userInfo.password);
        await sendVerificationEmail(userCredentials.user);

        await AuthRepository.createUser({
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            id: userCredentials.user.uid
        });
    } catch (error: any) {
        if (error instanceof FirebaseError) {
            if (error.code === "auth/invalid-email") {
                throw new AppValidationError(400, "Register form errors", { "email": "Invalid email" });
            } else if (error.code === "auth/email-already-in-use") {
                throw new AppValidationError(400, "Register form errors", { "email": "Email is already in use" });
            } else throw error;
        }
        throw error;
    }
}

async function sendVerificationEmail(user: User) {
    try {
        await sendEmailVerification(user);
        return;
    } catch (error: any) {
        throw error;
    }
}

async function resetPassword(resetInfo: ResetPasswordRequestDto) {
    try {
        const firebaseAuth = getAuth();
        return await sendPasswordResetEmail(firebaseAuth, resetInfo.email);
    } catch (error: any) {
        throw error;
    }
}


export const AuthService = {
    login,
    register,
    resetPassword
};