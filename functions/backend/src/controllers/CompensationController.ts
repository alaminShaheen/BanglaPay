import { NextFunction, Request, Response } from "express";
import { handleFormValidationErrors } from "@/utils/throwValidationErrors";
import { CompensationService } from "@/services/CompensationService";
import { FormOptionsResponseDto } from "@/models/dtos/FormOptionsResponseDto";
import { AddCompensationRequestDto } from "@/models/dtos/AddCompensationRequestDto";

async function addHandler(request: Request<{}, {}, AddCompensationRequestDto>, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);
        const compensation = await CompensationService.addCompensation(request.body);
        response.status(200).json(compensation);
    } catch (error) {
        next(error);
    }
}

async function getCompensationsHandler(request: Request, response: Response, next: NextFunction) {
    try {
        const compensations = await CompensationService.getCompensations();
        response.status(200).json(compensations);
    } catch (error) {
        next(error);
    }
}

async function formSelectOptionsHandler(request: Request, response: Response<FormOptionsResponseDto>, next: NextFunction) {
    try {
        const formOptions = CompensationService.getFormOptions();
        response.status(200).json(formOptions);
        return;
    } catch (error) {
        next(error);
    }
}

export const CompensationController = {
    addHandler,
    formSelectOptionsHandler,
    getCompensationsHandler,
};