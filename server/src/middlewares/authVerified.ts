import {admin} from "@/firebase";
import { NextFunction, Request, Response } from "express";

export const authenticateVerified = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if(!req.user?.isVerified) throw new Error("User not verified for this action.");

        next();
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(401).json({ errors: err.message });
        return;
    }
};
