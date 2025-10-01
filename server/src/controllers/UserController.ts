import config from "@/config";
import Follow from "@/models/Follow.model";
import User from "@/models/User.model";
import { formatError } from "@/utils/formatError";
import { Request, Response } from "express";

/**
 * GET - Controller responsável por pegar usuários pelo nome
 */
export const getUsersByName = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("User not provided.");
        const { uid } = req.user;

        // Verifying if page is provided
        const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page),
            limit = config.SYSTEM_POSTS_PER_PAGE;

        const users = await User.find(
            {
                _id: { $ne: uid },
                username: { $regex: `${req.query.name}`, $options: "i" },
            },
            { username: 1, fName: 1, lName: 1, image: 1 }
        )
            .skip((page - 1) * limit)
            .limit(limit);

        const count = await User.countDocuments({
            _id: { $ne: uid },
            username: { $regex: req.query.name },
        });

        res.status(200).json({ users, hasMore: count > page * limit });
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

/**
 * GET - Controller responsável por pegar um usuário pelo seu id
 */
export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        if (!req.user) throw new Error("User not provided.");
        const { uid } = req.user;

        const user = await User.findById(
            req.params.userId,
            req.params.userId !== uid
                ? {
                      username: 1,
                      fName: 1,
                      lName: 1,
                      image: 1,
                      banner: 1,
                      about: 1,
                      "meta.counters.following": 1,
                      "meta.counters.followers": 1,
                  }
                : {}
        );

        const isFollowing = !!(await Follow.findOne({
            userId: req.params.userId,
            followerId: req.user.uid,
        }));

        res.status(200).json({ user, isFollowing });
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

/**
 * POST - Controller responsável por criar um usuário
 */
export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        let user;
        const exists = await User.findById(req.user?.uid);
        if (exists) {
            user = exists;
        } else {
            user = await User.create({
                _id: req.user?.uid,
                email: req.user?.email,
                username: req.body.fName,
                fName: req.body.fName,
                lName: req.body.lName,
                image: req.body.image,
            });
        }

        res.status(200).json({ user });
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
