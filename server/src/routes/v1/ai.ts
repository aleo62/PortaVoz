import { validateStages } from "@/controllers/AIController";
import upload from "@/lib/multer";
import { validationError } from "@/middlewares/validationError";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

const validateByStage: Record<string, any[]> = {
    content: [
        body("title").trim().notEmpty().withMessage("title is required"),
        body("desc").trim().notEmpty().withMessage("desc is required"),
    ],
    images: [
        upload.array("3"),
        body("title").trim().notEmpty().withMessage("title is required"),
        body("desc").trim().notEmpty().withMessage("desc is required"),
    ],
    hashtags: [
        body("title").trim().notEmpty().withMessage("title is required"),
        body("desc").trim().notEmpty().withMessage("desc is required"),
        body("hashtags")
            .notEmpty()
            .withMessage("hashtags is required")
            .isArray()
            .withMessage("hashtags must be an array"),
    ],
};

// POST - Rota para validar post
router.post(
    "/validate/:stage",
    (req, res, next) => {
        const stage = req.params.stage;
        if (!validateByStage[stage]) {
            res.status(400).json({
                code: "ValidationError",
                error: "Invalid Stage",
            });
        }

        return Promise.all(validateByStage[stage].map((v) => v.run(req))).then(
            () => next()
        );
    },
    validationError,
    validateStages
);

export default router;
