import { AppError } from "@/errors/AppError";
import { Request, Response, NextFunction } from "express";

export const errorHandler = async (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            code: err.code,
            message: err.message,
            details: err.details || null,
        });
    }

    return res.status(500).json({
        code: 500,
        message: "Internal Server Error",
        details: err.message || null,
    });
};
