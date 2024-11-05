import { NextFunction, Request, Response } from "express";
import { handleFormValidationErrors } from "@/utils/throwValidationErrors";
import { CompensationService } from "@/services/CompensationService";
import { FormOptionsResponseDto } from "@/models/dtos/FormOptionsResponseDto";
import { AddCompensationRequestDto } from "@/models/dtos/AddCompensationRequestDto";

async function addHandler(request: Request<{}, {}, AddCompensationRequestDto>, response: Response, next: NextFunction) {
    try {
        handleFormValidationErrors(request);

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
    formSelectOptionsHandler
};