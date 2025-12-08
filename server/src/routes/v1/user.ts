import { getUserCommunities } from "@/controllers/CommunityController";
import {
    followUser,
    getFollowing,
    unfollowUser,
} from "@/controllers/FollowController";
import { getNotifications } from "@/controllers/NotificationController";
import { getPostByUser } from "@/controllers/PostController";
import { createSave, deleteSave, getSaves } from "@/controllers/SaveController";
import {
    createUser,
    deleteUser,
    demoteFromAdmin,
    demoteFromModerator,
    editPreferences,
    editUser,
    getRemainingReports,
    getUserById,
    getUserPreferencesByField,
    getUsers,
    promoteToAdmin,
    promoteToModerator,
} from "@/controllers/UserController";
import upload from "@/lib/multer";
import { authAdmin } from "@/middlewares/auth/authAdmin";
import { authenticateOwnerOrAdmin } from "@/middlewares/auth/authOwnerOrAdmin";
import { authSuperAdmin } from "@/middlewares/auth/authSuperAdmin";
import { authenticateUser } from "@/middlewares/auth/authUser";
import { validationError } from "@/middlewares/validation/validationError";
import { Request, Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get("/", authenticateUser, validationError, getUsers);
router.get("/:userId", authenticateUser, validationError, getUserById);

router.post(
    "/auth/",
    authenticateUser,
    body("fName").trim().notEmpty().withMessage("fName is required"),
    body("lName").trim().notEmpty().withMessage("lName is required"),
    body("image").optional().isURL().withMessage("image must be an URL"),
    createUser
);

router.delete(
    "/:userId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    deleteUser
);

router.put(
    "/:userId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "banner", maxCount: 1 },
    ]),
    body("username")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("username is required"),
    body("fName").optional().trim().notEmpty().withMessage("fName is required"),
    body("lName").optional().trim().notEmpty().withMessage("lName is required"),
    validationError,
    editUser
);

router.get("/:userId/posts", authenticateUser, validationError, getPostByUser);
router.get(
    "/:userId/communities",
    authenticateUser,
    validationError,
    getUserCommunities
);

router.get(
    "/:userId/remaining-reports",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    getRemainingReports
);

router.get(
    "/:followingId/following",
    authenticateUser,
    validationError,
    getFollowing
);

router.post(
    "/:followingId/follow",
    authenticateUser,
    validationError,
    followUser
);

router.delete(
    "/:unfollowId/unfollow",
    authenticateUser,
    validationError,
    unfollowUser
);

router.get(
    "/:userId/notifications",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    getNotifications
);

router.get(
    "/:userId/preferences/:field",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    getUserPreferencesByField
);

router.put(
    "/:userId/preferences",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    editPreferences
);

// // POST
// router.post(
//     "/code/send",
//     authenticateUser,
//     validationError,
//     sendCode
// );

// // POST
// router.post(
//     "/code/verify",
//     authenticateUser,
//     validationError,
//     verifyCode
// );

router.get(
    "/:userId/saves",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    getSaves
);

router.post(
    "/:userId/saves/:postId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    createSave
);

router.delete(
    "/:userId/saves/:postId",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    deleteSave
);

router.put(
    "/:userId/promote/admin",
    authenticateUser,
    authSuperAdmin,
    promoteToAdmin
);

router.put(
    "/:userId/promote/moderator",
    authenticateUser,
    authAdmin,
    promoteToModerator
);

router.put(
    "/:userId/demote/admin",
    authenticateUser,
    authSuperAdmin,
    demoteFromAdmin
);

router.put(
    "/:userId/demote/moderator",
    authenticateUser,
    authAdmin,
    demoteFromModerator
);

export default router;
