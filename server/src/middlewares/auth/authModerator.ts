import { NextFunction, Request, Response } from "express";

export const authModerator = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (!req.user || (!req.user.isAdmin && !req.user.isMod)) {
            res.status(403).json({
                message: "Access denied. Admins or Moderators only.",
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
