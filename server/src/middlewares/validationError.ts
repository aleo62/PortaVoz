import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validationError = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            code: "ValidationError",
            errors: errors.mapped(),
        });
        return;
    }

    next();
};
