import { fetchUid } from "@/firebase/fetchUid";
import { UserData } from "@/utils/types/userDataType";
import { NextFunction, Request, Response } from "express";

export const authenticateOwnerOrAdmin = (
    getUserId: (req: Request) => Promise<string | undefined>
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

            const ownerData = (await fetchUid(req.user.uid)) as UserData;
            console.log(ownerData._publicId)
            console.log(req.user.isAdmin)
            if (userId !== ownerData._publicId && !req.user.isAdmin)
                throw new Error("User not allowed");

            next();
        } catch (err) {
            if (!(err instanceof Error)) throw err;
            res.status(401).json({ errors: err.message });
            return;
        }
    };
};
