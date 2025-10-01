import config from "@/config";
import Chat from "@/models/Chat.model";
import { generateId } from "@/utils/generateId";

/**
 * Verifica se existe ou cria
 * @param userA e userB
 */
export async function findOrCreateChat(userA: string, userB: string) {
    try {
        let chat = await Chat.findOne({
            participants: { $all: [userA, userB] },
        });

        if (!chat) {
            const _id = generateId(config.SYSTEM_ID_SIZE, "R_");
            chat = await Chat.create({
                _id,
                participants: [userA, userB],
                visible: {
                    [userA]: true,
                    [userB]: false,
                }
            });
        }

        if (!chat.visible.get(userA)) {
            chat.visible.set(userA, true);
            await chat.save();
        }

        return chat;
    } catch (err) {
        throw err;
    }
}
