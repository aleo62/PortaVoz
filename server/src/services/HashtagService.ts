import config from "@/config";
import Hashtag from "@/models/Hashtag.model";
import { generateId } from "@/utils/generateId";

export const findOrCreateHashtag = async (content: string) => {
    let hashtag = await Hashtag.findOne({ content });
    if (!hashtag) {
        hashtag = await Hashtag.create({
            _id: generateId(config.SYSTEM_ID_SIZE, "H_"),
            content,
        });
    }
    await hashtag.updateOne({ $inc: { usageCount: 1 } });

    return hashtag._id;
};

export const findOrCreateMultipleHashtags = async (hashtags: Array<string>) => {
    const response = await Promise.all(
        hashtags.map(async (hashtag) => {
            return await findOrCreateHashtag(hashtag);
        })
    );

    return response;
};

export const listHashtags = async ({
    search,
    page = 1,
    limit = 20,
}: {
    search?: string;
    page?: number;
    limit?: number;
}) => {
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const skip = (Math.max(page, 1) - 1) * safeLimit;

    const filter = search
        ? {
              content: { $regex: search, $options: "i" },
          }
        : {};

    const hashtags = await Hashtag.find(filter)
        .sort({ usageCount: -1, createdAt: -1 })
        .skip(skip)
        .limit(safeLimit);

    const total = await Hashtag.countDocuments(filter);

    return { hashtags, total, page, limit: safeLimit };
};
