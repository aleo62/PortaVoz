import Post from "@/models/Post.model";
import { UserData } from "@/models/User.model";
import { fetchUser } from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export const validatePost = (
    getPostId: (req: Request) => Promise<string | undefined>
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const postId = await getPostId(req);
            if (!postId) throw new Error("No Post ID provided");

            const exists = await Post.exists({ _id: postId });
            if(!exists) throw new Error("Post does not exists");

            next();
        } catch (err) {
            if (!(err instanceof Error)) throw err;
            res.status(401).json({ errors: err.message });
            return;
        }
    };
};
