import { ErrorType } from "@/models/enums/ErrorType";

export class AppValidationError extends Error {
    public errorType: ErrorType

    constructor(public statusCode: number, public description: string, public fieldErrors: Record<string, string>) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.fieldErrors = fieldErrors;
        this.errorType = ErrorType.FORM_ERROR;
        Error.captureStackTrace(this);
    }
}