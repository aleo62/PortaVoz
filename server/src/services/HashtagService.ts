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
