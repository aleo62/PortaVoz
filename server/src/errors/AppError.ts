type ErrorCodes = "SERVER_ERROR" | "ALREADY_VERIFIED" | "TOO_MANY_REQUESTS" | "INVALID_FORM" | "USER_NO_REMAINING_REPORTS";

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
