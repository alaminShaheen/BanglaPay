import { NextFunction, Request, Response } from "express";
import { APP_CONSTANTS } from "@/constants/appConstants";
import { AppError } from "@/errors/AppError";
import { getAuth } from "firebase-admin/auth";


export async function verifyAuthentication(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[APP_CONSTANTS.AUTH_COOKIE];

    if (!token) {
        throw new AppError(403, "User unauthorized");
    }

    try {
        req.user = await getAuth().verifyIdToken(token);
        next();
    } catch (error) {
        next(error);
    }
}