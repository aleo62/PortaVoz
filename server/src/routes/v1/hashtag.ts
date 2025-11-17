// Roteador de posts: define endpoint para criação de post
import { getHahstags } from "@/controllers/HahstagController";
import { validationError } from "@/middlewares/validation/validationError";
import { Router } from "express";

const router = Router();

// GET - Rota para pegar hashtags
router.get("/", validationError, getHahstags);

export default router;
