import {
    createCommunity,
    deleteCommunity,
    getCommunities,
    getCommunityById,
    getCommunityMembers,
    joinCommunity,
    leaveCommunity,
    updateCommunity,
} from "@/controllers/CommunityController";
import upload from "@/lib/multer";
import { authenticateUser } from "@/middlewares/auth/authUser";
import { Router } from "express";

const router = Router();

router.post(
    "/",
    authenticateUser,
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "banner", maxCount: 1 },
    ]),
    createCommunity,
);
router.get("/", authenticateUser, getCommunities);
router.get("/:id", authenticateUser, getCommunityById);
router.put("/:id", authenticateUser, updateCommunity);
router.delete("/:id", authenticateUser, deleteCommunity);
router.post("/:id/join", authenticateUser, joinCommunity);
router.post("/:id/leave", authenticateUser, leaveCommunity);
router.get("/:id/members", authenticateUser, getCommunityMembers);

export default router;
