// Roteador de imagens: define endpoint para upload de imagem
import {
    createImage,
    deleteImage,
    updateImage,
} from "@/controllers/ImageController";
import upload from "@/lib/multer";
import { Router } from "express";

const router = Router();

// Rota para upload de uma imagem (recebe arquivo 'image' via multipart/form-data)
router.post("/", upload.single("image"), createImage);

// Rota para deletar uma imagem
router.delete("/", deleteImage);

// Rota para upload de uma imagem (recebe arquivo 'image' via multipart/form-data)
router.put("/", upload.single("image"), updateImage);

export default router;
