import config from "@/config";
import Report from "@/models/Report.model";
import { getReportsService, ReportListType } from "@/services/ReportService";
import { generateId } from "@/utils/generateId";
import { NextFunction, Request, Response } from "express";

export const getReports = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = config.SYSTEM_REPORTS_PER_PAGE;
        const type = (
            (req.query.type as string) || "all"
        ).toLowerCase() as ReportListType;

        const { reports, count } = await getReportsService(type, page, limit);
        res.status(200).json({
            reports,
            hasMore: count > page * limit,
            count,
        });
    } catch (err) {
        next(err);
    }
};

export const createReport = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { category, reportedItemType, reportedItemId, desc } = req.body;
        const userId = req.user!.uid;

        const newReport = await Report.create({
            _id: generateId(config.SYSTEM_ID_SIZE, "R_"),
            category,
            user: userId,
            reportedItemType,
            reportedItemId,
            desc,
        });

        res.status(201).json({
            message: "Report submitted",
            report: newReport,
        });
    } catch (err) {
        next(err);
    }
};

export const updateReport = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { reportId } = req.params;
        const { status } = req.body;

        const report = await Report.findById(reportId);

        if (!report) {
            return res.status(404).json({
                code: "NotFound",
                message: "Report not found",
            });
        }

        report.status = status;
        await report.save();

        res.status(200).json({
            message: "Report updated successfully",
            report,
        });
    } catch (err) {
        next(err);
    }
};

export const deleteReport = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { reportId } = req.params;

        const report = await Report.findByIdAndDelete(reportId);

        if (!report) {
            return res.status(404).json({
                code: "NotFound",
                message: "Report not found",
            });
        }

        res.status(200).json({
            message: "Report deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};
