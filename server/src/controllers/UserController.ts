import { fetchUid } from "@/firebase/fetchUid";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import { formatError } from "@/utils/formatError";
import { UserData } from "@/utils/types/userDataType";
import { Request, Response } from "express";

/**
 * PUT - Controller responsável por atulizar todos os posts e comments.
 */
export const updateUserContent = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("No User provided");
        const { uid } = req.user;

        const userData = (await fetchUid(uid)) as UserData;
        const userId = userData._publicId;

        const userNewInfo: any = {};
        userNewInfo.userName = userData.fName;
        userNewInfo.userPhoto = userData.image;

        if (
            !(await Post.updateMany({ userId }, { $set: userNewInfo })) ||
            !(await Comment.updateMany({ userId }, { $set: userNewInfo }))
        )
            throw new Error("Error to update");

        res.status(200).json({
            message: `All Posts and Comments updated from: ${userId}`,
        });
    } catch (err) {
        if (!(err instanceof Error)) throw err;

        const errors = formatError(err.message);

        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: errors,
        });
    }
};
