import { Router } from "express";
import { CompensationController } from "@/controllers/CompensationController";
import { addCompensationValidator } from "@/middlewares/validators/AddCompensationValidator";

// register all auth routes
export default (router: Router, baseApiUrl: string = "/") => {
    const compensationRouter = Router();

    compensationRouter.get("/", CompensationController.getCompensationsHandler)
    compensationRouter.post("/add", addCompensationValidator(), CompensationController.addHandler)
    compensationRouter.get("/form-options", CompensationController.formSelectOptionsHandler)

    router.use(baseApiUrl, compensationRouter);
    return router;
}