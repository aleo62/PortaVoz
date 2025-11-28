import {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
} from "@/controllers/ReportCategoryController";
import { createReport } from "@/controllers/ReportController";
import { authenticateUser } from "@/middlewares/auth/authUser";
import { authenticateVerified } from "@/middlewares/auth/authVerified";
import { authAdmin } from "@/middlewares/auth/authAdmin";
import { validationError } from "@/middlewares/validation/validationError";
import { Router } from "express";
import { body } from "express-validator";

const router = Router();

router.get("/categories", authenticateUser, getAllCategories);

router.post(
    "/",
    authenticateUser,
    authenticateVerified,
    body("category").notEmpty().withMessage("Category is required"),
    body("reportedItemType")
        .isIn(["post", "user", "comment"])
        .withMessage("Reported item type must be post, user or comment"),
    body("reportedItemId").notEmpty().withMessage("Reported item ID is required"),
    body("desc")
        .optional()
        .isLength({ max: 500 })
        .withMessage("Description must be less than 500 characters"),
    validationError,
    createReport
);

router.post(
    "/categories",
    authenticateUser,
    authAdmin,
    body("title").notEmpty().withMessage("Title is required"),
    body("desc").notEmpty().withMessage("Description is required"),
    body("severity")
        .isInt({ min: 1, max: 5 })
        .withMessage("Severity must be between 1 and 5"),
    validationError,
    createCategory
);

router.put(
    "/categories/:categoryId",
    authenticateUser,
    authAdmin,
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("desc").optional().notEmpty().withMessage("Description cannot be empty"),
    body("severity")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Severity must be between 1 and 5"),
    validationError,
    updateCategory
);

router.delete("/categories/:categoryId", authenticateUser, authAdmin, deleteCategory);

export default router;
