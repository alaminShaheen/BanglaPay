import {Router} from "express";

import { AuthController } from "@/controllers/AuthController";
import { loginUserValidator } from "@/middlewares/validators/LoginUserValidator";
import { registerUserValidator } from "@/middlewares/validators/RegisterUserValidator";
import { resetPasswordValidator } from "@/middlewares/validators/ResetPasswordValidator";

// register all auth routes
export default (router: Router) => {
	router.post('/auth/login', loginUserValidator(), AuthController.loginHandler);
	router.post('/auth/register', registerUserValidator(), AuthController.registerHandler);
	router.post('/auth/reset-password', resetPasswordValidator(), AuthController.registerPasswordReset);
}