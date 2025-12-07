import { AppError } from "@/errors/AppError";
import { NextFunction, Request, Response } from "express";

export const errorHandler = async (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if(err instanceof AppError) {
        return res.status(err.status).json({ code: err.code, message: err.message, details: err.details || null });
    }

    return res.status(500).json({ code: 500, message: "Internal Server Error", details: null });
};
