type ErrorCodes = "SERVER_ERROR" | "ALREADY_VERIFIED";

export class AppError extends Error {
    status: number;
    code: ErrorCodes;
    details: any;
    constructor(message: string, status: number, code: ErrorCodes, details: any) {
        super(message);
        this.status = status;
        this.code = code;
        this.details = details;
    }
}
