import CommunityMembership from "@/models/CommunityMembership.model";
import { NextFunction, Request, Response } from "express";

export const authCommunityMod = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid, isAdmin } = req.user!;
        const communityId = req.params.id || req.body.communityId;

        if (isAdmin) {
            return next();
        }

        if (!communityId) {
            return res
                .status(400)
                .json({ message: "Community ID is required" });
        }

        const membership = await CommunityMembership.findOne({
            userId: uid,
            communityId,
            role: "moderator",
        });

        if (!membership) {
            return res
                .status(403)
                .json({ message: "Access denied. Community moderator only." });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
