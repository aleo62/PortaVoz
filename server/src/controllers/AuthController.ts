import { AppError } from "@/errors/AppError";
import { sendVerificationCode, verifyVerificationCode } from "@/services/AuthCodeService";
import { Request, Response } from "express";

export const sendCode = async (req: Request, res: Response): Promise<void> => {
    try {
        if(req.user!.isVerified) throw new AppError("Already Verified.", 401)
        await sendVerificationCode(req.user!.uid, req.user!.email);

        res.status(200).json({ message: "Successfully sent." });
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.status).json({
                message: err.message,
            });
        } else {
            res.status(500).json({
                code: "ServerError",
                message: "Internal Server Error",
                errors: err,
            });
        }
    }
};

export const verifyCode = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message, result } = await verifyVerificationCode(req.user!.uid, req.body.code);

        res.status(200).json({ message, result });
    } catch (err) {
        if (err instanceof AppError) {
            res.status(err.status).json({
                message: err.message,
            });
        } else {
            res.status(500).json({
                code: "ServerError",
                message: "Internal Server Error",
                errors: err,
            });
        }
    }
};


