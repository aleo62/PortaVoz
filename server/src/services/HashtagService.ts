import config from "@/config";
import Hashtag from "@/models/Hashtag.model";
import { generateId } from "@/utils/generateId";

export const findOrCreateHashtag = async (content: string) => {
    let hashtag = await Hashtag.findOne({ content });
    if (!hashtag)
        hashtag = await Hashtag.create({
            _id: generateId(config.SYSTEM_ID_SIZE, "H_"),
            content,
        });
    await hashtag.updateOne({ usageCount: { $inc: 1 } });

    return hashtag._id;
};
