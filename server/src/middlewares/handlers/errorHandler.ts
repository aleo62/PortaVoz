import { AppError } from "@/errors/AppError";
import { Response } from "express";

export const errorHandler = async (err: any, res: Response) => {
    if (err instanceof AppError) {
        return res
            .status(err.status)
            .json({
                code: err.code,
                message: err.message,
                details: err.details || null,
            });
    } else if (err instanceof Error) {
        return res
            .status(500)
            .json({
                code: 500,
                message: "Internal Server Error",
                details: err.message,
            });
    }

    return res
        .status(500)
        .json({ code: 500, message: "Internal Server Error", details: null });
};
