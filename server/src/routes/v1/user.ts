import { sendCode, verifyCode } from "@/controllers/AuthCodeController";
import {
    followUser,
    getFollowing,
    unfollowUser,
} from "@/controllers/FollowController";
import { getNotifications } from "@/controllers/NotificationController";
import {
    createUser,
    editUser,
    getRemainingReports,
    getUserById,
    getUsersByName,
} from "@/controllers/UserController";
import upload from "@/lib/multer";
import { authenticateOwnerOrAdmin } from "@/middlewares/authOwnerOrAdmin";
import { authenticateUser } from "@/middlewares/authUser";
import { validationError } from "@/middlewares/validationError";
import { Request, Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get("/", authenticateUser, validationError, getUsersByName);

router.get("/:userId", authenticateUser, validationError, getUserById);

router.get(
    "/:userId/remaining-reports",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    getRemainingReports
);

/*
 ++
 ======= Routes to Auth events =======
 ++
*/

router.post(
    "/auth/",
    authenticateUser,
    body("fName").trim().notEmpty().withMessage("fName is required"),
    body("lName").trim().notEmpty().withMessage("lName is required"),
    body("image").optional().isURL().withMessage("image must be an URL"),
    validationError,
    createUser
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

/*
 ++
 ======= Routes to Follow events =======
 ++
*/

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

/*
 ++
 ======= Routes to Notifications events =======
 ++
*/

router.get(
    "/:userId/notifications",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    getNotifications
);

/*
 ++
 ======= Routes to Code Auth events =======
 ++
*/

// POST
router.post(
    "/code/send",
    authenticateUser,
    validationError,
    sendCode
);

// POST
router.post(
    "/code/verify",
    authenticateUser,
    validationError,
    verifyCode
);

export default router;
