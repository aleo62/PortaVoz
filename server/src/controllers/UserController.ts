import config from "@/config";
import User from "@/models/User.model";
import { updateImage } from "@/services/ImageService";
import {
    createUserService,
    deleteUserService,
    fetchUser,
    getUserByIdService,
    getUsersService,
    verifyRemainingReports,
} from "@/services/UserService";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { name } = req.query;
        const page = Number(req.query.page) || 1,
            limit = config.SYSTEM_USERS_PER_PAGE;

        const { users, count } = await getUsersService(uid, name as string || "", page, limit);

        res.status(200).json({ users, hasMore: count > page * limit, count });
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { userId } = req.params;
        const { user } = await getUserByIdService(userId, uid);

        res.status(200).json({ user });
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};

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
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};

export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { uid, email } = req.user!;
        const { user } = await createUserService(uid, email, req.body);

        res.status(200).json({ user });
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        await deleteUserService(userId);
        res.status(200).json({ ok: true });
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { uid } = req.user!;
        const currentData = await fetchUser(uid);
        let newImage, newBanner;

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };
        if (files.image && files.image[0]) {
            newImage = await updateImage(
                files.image[0].path,
                currentData.image,
                "users_image"
            );
        }

        if (files.banner && files.banner[0]) {
            newBanner = await updateImage(
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
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};
