import { Router } from "express";

import { CompanyController } from "@/controllers/CompanyController";
import { addCompanyValidator } from "@/middlewares/validators/AddCompanyValidator";
import { verifyAuthentication } from "@/middlewares/verifyAuthentication";

// register all auth routes
export default (router: Router, baseApiUrl: string = "/") => {
    const companyRouter = Router();

    companyRouter.get("/", verifyAuthentication, CompanyController.getCompaniesHandler);
    companyRouter.post("/add", verifyAuthentication, addCompanyValidator(), CompanyController.addCompanyHandler);

    router.use(baseApiUrl, companyRouter);
    return router;
}