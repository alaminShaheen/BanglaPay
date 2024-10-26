import { ErrorRequestHandler } from "express";
import { FirebaseError } from "firebase/app";
import { AppError } from "@/errors/AppError";

export const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (error instanceof FirebaseError) {
        logging.log(error.code, error.message);
        if (error.code === "auth/email-already-in-use") {
            response.status(400).send({ message: "Email is already in use" });
        }
    } else if (error instanceof AppError) {
        response.status(error.statusCode).send({ error: error.message });
    }
    response.status(500).send({ message: "Internal Server Error" });
    return;
};