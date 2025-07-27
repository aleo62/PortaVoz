import {
    createImageService,
    deleteImageService,
} from "@/services/ImageService";
import { Request, Response } from "express";

/**
 * Controller responsável por criar uma imagem.
 * Recebe o arquivo da requisição, faz upload e retorna a URL.
 */
export const createImage = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        // Verifica se o arquivo foi enviado
        if (!req.file?.path) throw new Error("File required");
        // Faz upload da imagem e obtém a URL
        const url = await createImageService(req.file.path);

        res.status(201).json({
            message: "Image Uploaded Successfully",
            image_url: url,
        });
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};

/**
 * Controller responsável por deletar uma imagem.
 * Recebe a URL da imagem no corpo da requisição e remove do Cloudinary.
 */
export const deleteImage = async (
    req: Request,
    res: Response
): Promise<void> => {
    const url = req.query.url as string;
    await deleteImageService(url);

    res.status(201).json({ message: "Image Deleted Successfully" });
};

/**
 * Controller responsável por atualizar(substituir uma já existente) uma imagem.
 * Recebe a URL da imagem no corpo da requisição e remove do Cloudinary.
 */
export const updateImage = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const deleteURL = req.query.url as string;
        await deleteImageService(deleteURL);

        // Verifica se o arquivo foi enviado
        if (!req.file?.path) throw new Error("File required");
        // Faz upload da imagem e obtém a URL
        const createURL = await createImageService(req.file.path);

        res.status(201).json({
            message: "Image Deleted and Uploaded Successfully",
            image_url: createURL,
        });
    } catch (err) {
        if (!(err instanceof Error)) throw err;
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: err.message,
        });
    }
};
