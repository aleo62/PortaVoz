import config from "@/config";
import ReportCategory from "@/models/ReportCategory.model";
import { generateId } from "@/utils/generateId";
import { NextFunction, Request, Response } from "express";

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { type } = req.query;
        const filter = type ? { type: { $in: [type, "all"] } } : {};
        const categories = await ReportCategory.find(filter).sort({
            severity: 1,
        });
        res.status(200).json({ categories });
    } catch (err) {
        next(err);
    }
};

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, desc, severity, type } = req.body;
        const newCategory = await ReportCategory.create({
            _id: generateId(config.SYSTEM_ID_SIZE, "RC_"),
            title,
            desc,
            severity,
            type: type || "all",
        });
        res.status(201).json({
            message: "Category created",
            category: newCategory,
        });
    } catch (err) {
        next(err);
    }
};

export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const updatedCategory = await ReportCategory.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({
            message: "Category updated",
            category: updatedCategory,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const deletedCategory = await ReportCategory.findByIdAndDelete(id);
        if (!deletedCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json({ message: "Category deleted" });
    } catch (err) {
        next(err);
    }
};
