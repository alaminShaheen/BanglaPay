import { Response } from "express";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from "firebase/auth";
import { getAuth as gAuth } from "firebase-admin/auth";
import { AuthRepository } from "@/repositories/AuthRepository";
import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";
import { LoginRequestDto } from "@/models/dtos/LoginRequestDto";
import { ResetPasswordRequestDto } from "@/models/dtos/ResetPasswordRequestDto";
import { LoginResponseDto } from "@/models/dtos/LoginResponseDto";

async function login(userLoginInfo: LoginRequestDto, response: Response): Promise<LoginResponseDto> {
    try {
        const firebaseAuth = getAuth();
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, userLoginInfo.email, userLoginInfo.password);
        const accessToken = await userCredential.user.getIdToken();

        const user = await AuthRepository.getUser(userCredential.user.uid);
        gAuth().createCustomToken(user.id, user);
        return {
            user,
            accessToken
        };
    } catch (error) {
        throw error;
    }
}

async function register(userInfo: RegisterUserDto) {
    try {
        const firebaseAuth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, userInfo.email, userInfo.password);
        await sendEmailVerification(userCredentials.user);

        await AuthRepository.createUser({
            email: userInfo.email,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname,
            id: userCredentials.user.uid
        });
    } catch (error: any) {
        throw error;
    }
}

async function resetPassword(resetInfo: ResetPasswordRequestDto) {
    try {
        const firebaseAuth = getAuth();
        await sendPasswordResetEmail(firebaseAuth, resetInfo.email);
        return;
    } catch (error: any) {
        throw error;
    }
}


export const AuthService = {
    login,
    register,
    resetPassword
};