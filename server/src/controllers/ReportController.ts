import config from "@/config";
import Report from "@/models/Report.model";
import { formatError } from "@/utils/formatError";
import { generateId } from "@/utils/generateId";
import { Request, Response } from "express";

export const createReport = async (req: Request, res: Response) => {
    try {
        const { category, reportedItemType, reportedItemId, desc } =
            req.body;
        const userId = req.user!.uid;

        const newReport = await Report.create({
            _id: generateId(config.SYSTEM_ID_SIZE, "R_"),
            category,
            user: userId,
            reportedItemType,
            reportedItemId,
            desc,
        });

        res.status(201).json({ message: "Report submitted", report: newReport });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        res.status(500).json({
            code: "ServerError",
            message: "Internal Server Error",
            errors: formatError(message),
        });
    }
};
