import { getHashtags } from "@/controllers/HashtagController";
import { Router } from "express";

const router = Router();

router.get("/", getHashtags);

export default router;
