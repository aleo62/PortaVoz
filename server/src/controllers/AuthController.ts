import { AppError } from "@/errors/AppError";
import { sendVerificationCode, verifyVerificationCode } from "@/services/AuthCodeService";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";

export const sendCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        if(req.user!.isVerified) throw new AppError("Already Verified.", 401, "ALREADY_VERIFIED", null)
        await sendVerificationCode(req.user!.uid, req.user!.email);

        res.status(200).json({ message: "Successfully sent." });
    } catch (err) {
        next(err)
    }
};

export const verifyCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { message, result } = await verifyVerificationCode(req.user!.uid, req.body.code);

        res.status(200).json({ message, result });
    } catch (err) {
        next(err)
    }
};


