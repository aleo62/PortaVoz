import {
    followUser,
    getFollowing,
    unfollowUser,
} from "@/controllers/FollowController";
import { getNotifications } from "@/controllers/NotificationController";
import { getPostByUser } from "@/controllers/PostController";
import {
    createUser,
    deleteUser,
    editUser,
    getRemainingReports,
    getUserById,
    getUsers,
    makeUserAdmin,
} from "@/controllers/UserController";
import upload from "@/lib/multer";
import { authAdmin } from "@/middlewares/auth/authAdmin";
import { authenticateOwnerOrAdmin } from "@/middlewares/auth/authOwnerOrAdmin";
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
    validationError,
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

router.put(
    "/:userId/admin",
    authenticateUser,
    authAdmin,
    validationError,
    makeUserAdmin
);

export default router;
