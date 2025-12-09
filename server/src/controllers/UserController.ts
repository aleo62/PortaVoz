import config from "@/config";
import User from "@/models/User.model";
import { updateImage } from "@/services/ImageService";
import {
    createUserService,
    deleteUserService,
    fetchUser,
    getPreferencesByField,
    getPreferencesByUser,
    getUserByIdService,
    getUsersService,
    makeUserAdminService,
    makeUserModeratorService,
    removeAdminRoleService,
    removeModeratorRoleService,
    updateUserPreferenceService,
    verifyRemainingReports,
    revokeUserSessionsService,
} from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { name } = req.query;
        const page = Number(req.query.page) || 1,
            limit = config.SYSTEM_USERS_PER_PAGE;

        const { users, count } = await getUsersService(
            req.user!,
            (name as string) || "",
            page,
            limit,
        );

        res.status(200).json({ users, hasMore: count > page * limit, count });
    } catch (err) {
        next(err);
    }
};

export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { uid } = req.user!;
        const { userId } = req.params;
        const { user } = await getUserByIdService(userId, uid);

        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

export const getRemainingReports = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { canReport, remaining, resetAt } = await verifyRemainingReports(
            req.params.userId,
            req.user!.isAdmin,
        );
        res.status(200).json({
            canReport,
            remaining,
            resetAt,
        });
    } catch (err) {
        next(err);
    }
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { uid, email } = req.user!;
        const { user } = await createUserService(uid, email, req.body);

        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        await deleteUserService(userId);
        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const revokeUserSessions = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        await revokeUserSessionsService(userId);
        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const editUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const currentData = await fetchUser(req.params.userId);
        if (
            currentData!.role === "superadmin" &&
            req.user!.uid !== currentData._id
        ) {
            res.status(400).json({ message: "Not allowed to edit superadmin" });
            return;
        }
        let newImage, newBanner;

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };
        if (files.image && files.image[0]) {
            newImage = await updateImage(
                files.image[0].path,
                currentData.image,
                "users_image",
            );
        }

        if (files.banner && files.banner[0]) {
            newBanner = await updateImage(
                files.banner[0].path,
                currentData.banner!,
                "banners_image",
            );
        }

        const newData = {
            username: req.body.username ?? currentData.username,
            fName: req.body.fName ?? currentData.fName,
            lName: req.body.lName ?? currentData.lName,
            about: req.body.about ?? currentData.about,
            image: newImage ?? currentData.image,
            banner: newBanner ?? currentData.banner,
            "meta.limits": req.body.limits
                ? JSON.parse(req.body.limits)
                : currentData.meta.limits,
        };

        const user = await User.findByIdAndUpdate(req.params.userId, newData, {
            new: true,
        });

        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

export const getUserPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        const preferences = await getPreferencesByUser(userId);
        res.status(200).json({ preferences });
    } catch (err) {
        next(err);
    }
};

export const getUserPreferencesByField = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId, field } = req.params;
        if (field !== "notifications") {
            res.status(400).json({ message: "Invalid field" });
            return;
        }
        const preferences = await getPreferencesByField(userId, field);
        res.status(200).json({ preferences });
    } catch (err) {
        next(err);
    }
};

export const editPreferences = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        const { path, value } = req.body;

        const result = await updateUserPreferenceService(userId, path, value);

        if (result.modifiedCount === 0) {
            res.status(400).json({
                message: "Failed to update preference or value unchanged",
            });
            return;
        }

        res.status(200).json({ ok: true, value });
    } catch (err) {
        next(err);
    }
};

export const promoteToAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        await makeUserAdminService(userId);
        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const promoteToModerator = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        await makeUserModeratorService(userId);
        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const demoteFromAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        await removeAdminRoleService(userId);
        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};

export const demoteFromModerator = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { userId } = req.params;
        await removeModeratorRoleService(userId);
        res.status(200).json({ ok: true });
    } catch (err) {
        next(err);
    }
};
