export class AppError extends Error {
    constructor(public statusCode: number, public description: string) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}