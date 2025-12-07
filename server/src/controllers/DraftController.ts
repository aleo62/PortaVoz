import {
    createDraft,
    deleteDraft,
    getDraftsByUser,
    publishDraft,
} from "@/services/DraftService";
import { formatError } from "@/utils/formatError";
import { NextFunction, Request, Response } from "express";

export const createNewDraft = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { newDraft } = await createDraft(req);
        res.status(201).json({ message: "Draft created", data: newDraft });
    } catch (err) {
        next(err);
    }
};

export const getUserDrafts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid } = req.user!;
        const drafts = await getDraftsByUser(uid);
        res.status(200).json({ drafts });
    } catch (err) {
        next(err);
    }
};

export const deleteDraftById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { uid } = req.user!;
        const { draftId } = req.params;
        await deleteDraft(draftId, uid);
        res.status(200).json({ message: "Draft deleted" });
    } catch (err) {
        next(err);
    }
};

export const publishDraftById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { draftId } = req.params;
        const { newPost } = await publishDraft(req, draftId);
        res.status(201).json({
            message: "Draft published successfully",
            data: newPost,
        });
    } catch (err) {
        next(err);
    }
};
