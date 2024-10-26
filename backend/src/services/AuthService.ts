import { RegisterUserDto } from "@/models/dtos/RegisterUserDto";
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from "firebase/auth";
import { LoginRequestUserDto } from "@/models/dtos/LoginRequestUserDto";
import { AuthRepository } from "@/repositories/AuthRepository";
import { Response } from "express";
import { setCookie } from "@/utils/setCookie";
import { User } from "@/models/User";
import { ResetPasswordRequestDto } from "@/models/dtos/ResetPasswordRequestDto";

async function login(userLoginInfo: LoginRequestUserDto, response: Response): Promise<User> {
    try {
        const firebaseAuth = getAuth();
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, userLoginInfo.email, userLoginInfo.password);
        const accessToken = await userCredential.user.getIdToken();
        setCookie(accessToken, response);
        return await AuthRepository.getUser(userCredential.user.uid);
    } catch (error) {
        throw error;
    }
}

async function register(userInfo: RegisterUserDto) {
    try {
        const firebaseAuth = getAuth();
        const userCredentials = await createUserWithEmailAndPassword(firebaseAuth, userInfo.email, userInfo.password);
        userCredentials.user;
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
    resetPassword,
};