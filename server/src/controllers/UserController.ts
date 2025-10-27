import config from "@/config";
import Follow from "@/models/Follow.model";
import User from "@/models/User.model";
import { sendVerificationCode } from "@/services/AuthCodeService";
import { updateImageService } from "@/services/ImageService";
import { fetchUser, verifyRemainingReports } from "@/services/UserService";
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
        const { uid } = req.user!;

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
        const { uid } = req.user!;

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
            followerId: req.user?.uid,
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
 * GET - Controller responsável por ver se o usuário pelo id possui posts restantes
 */
export const getRemainingReports = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { canReport, remaining, resetAt } = await verifyRemainingReports(
            req.params.userId,
            req.user!.isAdmin
        );
        res.status(200).json({
            canReport,
            remaining,
            resetAt,
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

        if(!req.user?.isVerified) await sendVerificationCode(req.user?.uid!, req.user?.email!);

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

/**
 * PUT - Controller responsável por editar um usuário
 */
export const editUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uid } = req.user!;
        const currentData = await fetchUser(uid);
        let newImage, newBanner;

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };
        if (files.image && files.image[0]) {
            newImage = await updateImageService(
                files.image[0].path,
                currentData.image,
                "users_image"
            );
        }

        if (files.banner && files.banner[0]) {
            newBanner = await updateImageService(
                files.banner[0].path,
                currentData.banner!,
                "banners_image"
            );
        }

        const newData = {
            username: req.body.username ?? currentData.username,
            fName: req.body.fName ?? currentData.fName,
            lName: req.body.lName ?? currentData.lName,
            about: req.body.about ?? currentData.about,
            image: newImage ?? currentData.image,
            banner: newBanner ?? currentData.banner,
        };

        const user = await User.findByIdAndUpdate(req.params.userId, newData, {
            new: true,
        });

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
