import { Router } from "express";

import { CompanyController } from "@/controllers/CompanyController";
import { addCompanyValidator } from "@/middlewares/validators/AddCompanyValidator";
import { verifyAuthentication } from "@/middlewares/verifyAuthentication";

// register all auth routes
export default (router: Router) => {
    router.get("/company", verifyAuthentication, CompanyController.getCompaniesHandler);
    router.post("/company/add", verifyAuthentication, addCompanyValidator(), CompanyController.addCompanyHandler);
}