import config from "@/config";
import { fetchPublicId } from "@/firebase/fetchPublidId";
import Chat from "@/models/Chat.model";
import { generateId } from "@/utils/generateId";

/**
 * Verifica se existe ou cria
 * @param userA e userB
 */
export async function findOrCreateChat(userA: string, userB: string) {
    try {
        let chat = await Chat.findOne({ participants: { $all: [userA, userB] } });

        if (!chat) {
            const { userData: userDataA } = await fetchPublicId(userA), { userData: userDataB }  = await fetchPublicId(userB);

            if(!userDataA || !userDataB) throw new Error("User does not exists");

            const _id = generateId(config.SYSTEM_ID_SIZE, "R_");
            chat = await Chat.create({
                _id,
                participants: [userA, userB],
                participantsPhotos: {
                    userA: userDataA?.image,
                    userB: userDataB?.image,
                },
                participantsNames: {
                    userA: userDataA?.username,
                    userB: userDataB?.username,
                }
            })
        }

        return chat;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}
