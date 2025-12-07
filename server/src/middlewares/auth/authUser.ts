import { admin } from "@/firebase";
import { NextFunction, Request, Response } from "express";

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.headers.authorization) throw new Error("No token provided");

        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer "))
            throw new Error("Invalid auth header");

        const token = authHeader.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);

        req.user = {
            uid: decodedToken.uid,
            isAdmin: decodedToken.admin === true,
            isMod: decodedToken.mod === true,
            email: decodedToken.email!,
            isVerified: decodedToken.email_verified ?? false,
        };

        next();
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(401).json({ errors: err.message });
        return;
    }
};
