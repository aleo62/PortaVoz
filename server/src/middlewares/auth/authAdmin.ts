import { NextFunction, Request, Response } from "express";

export const authAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user || !req.user.isAdmin) {
            res.status(403).json({ message: "Access denied. Admins only." });
            return;
        }
        next();
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({ errors: err.message });
        return;
    }
};
