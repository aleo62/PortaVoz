import chatRouter from "@/routes/v1/chat";
import hashtagRouter from "@/routes/v1/hashtag";
import postRouter from "@/routes/v1/post";
import reportRouter from "@/routes/v1/report";
import userRouter from "@/routes/v1/user";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    res.status(200).json({
        message: "API is running",
        status: "ok",
        version: "1.0.0",
        success: true,
        timeStamp: new Date().toISOString(),
    });
});

router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/chats", chatRouter);
router.use("/hashtags", hashtagRouter);
router.use("/reports", reportRouter);

export default router;
