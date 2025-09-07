/**
 * Arquivo principal de rotas da API v1.
 * Define as rotas raiz, de posts e de imagens.
 */
import imageRouter from "@/routes/v1/image";
import postRouter from "@/routes/v1/post";
import userRouter from "@/routes/v1/user";
import validateRouter from "@/routes/v1/validate";
import chatRouter from "@/routes/v1/chat";
import { Router } from "express";

// Instancia o router do Express
const router = Router();

/**
 * Rota raiz para verificação de status da API
 */
router.get("/", async (req, res) => {
    res.status(200).json({
        message: "API is running",
        status: "ok",
        version: "1.0.0",
        success: true,
        timeStamp: new Date().toISOString(),
    });
});

// Rotas de posts
router.use("/posts", postRouter);
// Rotas de users
router.use("/users", userRouter);
// Rotas de imagens
router.use("/images", imageRouter);
// Rotas de ia
router.use("/validate", validateRouter);
// Rotas das mensagens
router.use("/chats", chatRouter);

export default router;
