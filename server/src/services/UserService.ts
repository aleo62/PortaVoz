import { editUser } from "@/firebase/editUser";
import { fetchPublicId } from "@/firebase/fetchPublidId";
import UserCounters, { UserCountersData } from "@/models/UserCounters.model";

/**
 * Criar um documento de counters
 * @param userId para identifica com que user estamos lidando
 */
export async function createCounter(userId: string) {
    try {
        const userCounter = await UserCounters.find({ userId });
        if (userCounter.length !== 0)
            throw new Error("User document already exists.");

        const newCounter = await UserCounters.create({
            userId,
            followers: 0,
            following: 0,
            unreadNotifications: 0,
        });
        return newCounter;
    } catch (err) {
        console.error("Error creating user counter:", err);
        throw err;
    }
}

/**
 * Atualiza um documento de counters
 * @param userId para identifica com que user estamos lidando
 * @param data Dados a ataulizar na tabela
 */
export async function updateCounter(
    userId: string,
    data: Partial<UserCountersData>
) {
    try {
        const userCounter = await UserCounters.find({ userId });
        const { userData, uid } = await fetchPublicId(userId);
        if(!userData || !uid) throw new Error("User does not exists.");

        if (userCounter.length == 0) {
            await createCounter(userId);
        }
        
        await editUser(uid, {
            meta: {
                ...userData.meta,
                counters: {
                    ...userData.meta.counters,
                    ...data
                }
            }
        });

        await UserCounters.findOneAndUpdate(
            { userId },
            { $set: data },
            { strict: true }
        );
        return;
    } catch (err) {
        console.error("Error updating user counter:", err);
        throw err;
    }
}
