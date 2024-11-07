import { NextFunction, Request, Response } from "express";

import { CompanyService } from "@/services/CompanyService";
import { AddCompanyRequestDto } from "@/models/dtos/AddCompanyRequestDto";
import { handleFormValidationErrors } from "@/utils/throwValidationErrors";
import logging from "@/utils/logging";

async function getCompaniesHandler(request: Request, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const companies = await CompanyService.getAllCompanies();
        response.status(200).json(companies);
    } catch (error) {
        next(error);
    }
}

async function addCompanyHandler(request: Request<{}, {}, AddCompanyRequestDto>, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        logging.log(request.body)
        const company = await CompanyService.addCompany(request.body);
        response.status(200).json(company);
    } catch (error) {
        next(error);
    }
}

export const CompanyController = {
    getCompaniesHandler,
    addCompanyHandler
};