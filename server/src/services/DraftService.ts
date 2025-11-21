import config from "@/config";
import Draft, { DraftData } from "@/models/Draft.model";
import Post from "@/models/Post.model";
import User from "@/models/User.model";
import { generateId } from "@/utils/generateId";
import { Request } from "express";
import { findOrCreateMultipleHashtags } from "./HashtagService";
import { uploadMultipleImages } from "./ImageService";
import { verifyRemainingReports } from "./UserService";
import { validateCompletePost } from "./ValidateService";

export const createDraft = async (req: Request) => {
    const { uid } = req.user!;
    const { title, desc, hashtags, location, address, status } =
        req.body as Partial<DraftData>;
    const files = req.files as Express.Multer.File[] | undefined;

    let images: string[] | undefined = undefined;
    if (files && files.length > 0) {
        images = await uploadMultipleImages(files, "drafts_images");
    }

    let hashtagsId: string[] | undefined = undefined;
    if (hashtags && Array.isArray(hashtags) && hashtags.length > 0) {
        hashtagsId = (await findOrCreateMultipleHashtags(hashtags)) as string[];
    }

    const newDraft = await Draft.create({
        _id: generateId(config.SYSTEM_ID_SIZE, "D_"),
        user: uid,
        title,
        desc,
        images,
        hashtags: hashtagsId,
        location,
        address,
        status: status || "ativo",
    });

    return { newDraft };
};

export const deleteDraft = async (draftId: string, userId: string) => {
    const draft = await Draft.findOneAndDelete({ _id: draftId, user: userId });
    if (!draft) throw new Error("Draft not found");

    return draft;
};

export const publishDraft = async (req: Request, draftId: string) => {
    const { uid, isAdmin } = req.user!;
    const draft = await Draft.findById(draftId);
    if (!draft) throw new Error("Draft not found");
    if (draft.user !== uid) throw new Error("Unauthorized");

    const { title, desc, hashtags, location, address, status } = draft;
    const files = req.files as Express.Multer.File[] | undefined;

    if (!title || !desc || !hashtags || !location || !address) {
        throw new Error("Draft is incomplete. Missing required fields.");
    }

    if (!files || !files.length) {
        if (!draft.images || draft.images.length === 0) {
            throw new Error("Images are required to publish draft");
        }
    }

    const { canReport } = await verifyRemainingReports(uid, isAdmin);
    if (!canReport) throw new Error("User has no remaining reports");

    let images: string[] = draft.images || [];
    if (files && files.length > 0) {
        const uploadedImages = await uploadMultipleImages(
            files,
            "posts_images"
        );
        images = [...images, ...uploadedImages].slice(0, 3);
    }

    if (files && files.length > 0) {
        const finalValidation = await validateCompletePost(
            {
                title,
                desc,
                hashtags,
                location,
                address,
                status,
            },
            files
        );
        if (!finalValidation.valid) {
            const errorMessage =
                finalValidation.errors && finalValidation.errors.length
                    ? finalValidation.errors.join(" | ")
                    : "Draft validation failed";
            throw new Error(errorMessage);
        }
    }
    const hashtagsId = await findOrCreateMultipleHashtags(hashtags);

    const newPost = await Post.create({
        _id: generateId(config.SYSTEM_ID_SIZE, "P_"),
        user: uid,
        title,
        desc,
        images,
        hashtags: hashtagsId,
        location,
        address,
        status: status || "ativo",
    });

    await Draft.findByIdAndDelete(draftId);

    if (!isAdmin) {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 7);

        await User.updateOne(
            { _id: uid },
            {
                $inc: {
                    "meta.limits.remainingReports": -1,
                    "meta.counters.totalReports": 1,
                },
                $set: { "meta.limits.reportsResetAt": newDate },
            }
        );
    }

    return { newPost };
};

export const getDraftsByUser = async (userId: string) => {
    const drafts = await Draft.find({ user: userId })
        .sort({ updatedAt: -1 })
        .populate("hashtags", "content");
    return drafts;
};
