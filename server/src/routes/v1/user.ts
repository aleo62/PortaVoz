import {
    followUser,
    getFollowing,
    unfollowUser,
} from "@/controllers/FollowController";
import { getNotifications } from "@/controllers/NotificationController";
import {
    createUser,
    getUserById,
    getUsersByName,
} from "@/controllers/UserController";
import { authenticateOwnerOrAdmin } from "@/middlewares/authOwnerOrAdmin";
import { authenticateUser } from "@/middlewares/authUser";
import { validationError } from "@/middlewares/validationError";
import { Request, Router } from "express";
import { body } from "express-validator";

const router = Router();

// GET - Rota para pegar usuarios pelo nome
router.get("/", authenticateUser, validationError, getUsersByName);

// GET - Rota para pegar usuario por id
router.get("/:userId", authenticateUser, validationError, getUserById);

/*
 ++
 ======= Routes to Auth events =======
 ++
*/

// POST - Rota para criar usuario
router.post(
    "/auth/",
    authenticateUser,
    body("fName").trim().notEmpty().withMessage("fName is required"),
    body("lName").trim().notEmpty().withMessage("lName is required"),
    body("image").optional().isURL().withMessage("image must be an URL"),
    validationError,
    createUser
);

/*
 ++
 ======= Routes to Follow events =======
 ++
*/

// GET - Rota para ver se segue
router.get(
    "/:followingId/following",
    authenticateUser,
    validationError,
    getFollowing
);

// POST - Rota para adicionar seguidor
router.post(
    "/:followingId/follow",
    authenticateUser,
    validationError,
    followUser
);

// DELETE - Rota para remover seguidor
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

// GET - Rota para notificações
router.get(
    "/:userId/notifications",
    authenticateUser,
    authenticateOwnerOrAdmin(async (req: Request) => {
        return req.params.userId;
    }),
    validationError,
    getNotifications
);

export default router;
