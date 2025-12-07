import User from "@/models/User.model";
import { NextFunction, Request, Response } from "express";

export const authSuperAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user) {
            res.status(403).json({ message: "Access denied." });
            return;
        }

        const user = await User.findById(req.user.uid);
        if (!user || user.role !== "superadmin") {
            res.status(403).json({
                message: "Access denied. SuperAdmins only.",
            });
            return;
        }

        next();
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({ errors: err.message });
        return;
    }
};
