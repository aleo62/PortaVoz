import { UserData } from "@/models/User.model";
import { fetchUser } from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export const authenticateOwnerOrAdmin = (
    getUserId: (req: Request) => Promise<string | string[] | undefined>
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if (!req.user) throw new Error("No User provided");

            const userId = await getUserId(req);
            if (!userId) throw new Error("No User ID provided");

            const ownerData = (await fetchUser(req.user.uid)) as UserData;
            if (Array.isArray(userId)) {
                if (
                    !userId.includes(ownerData._id as string) &&
                    !req?.user?.isAdmin
                )
                    throw new Error("Access denied.");
            } else {
                if (userId !== ownerData._id && !req.user.isAdmin)
                    throw new Error("Access denied.");
            }

            next();
        } catch (err) {
            if (!(err instanceof Error)) throw err;
            res.status(401).json({ errors: err.message });
            return;
        }
    };
};
