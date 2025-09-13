import { UserData } from "@/utils/types/userDataType";
import admin from "./admin";
export const fetchPublicId = async (
    publicId: string
): Promise<{
    userData: UserData;
    uid: string;
}> => {
    const db = admin.firestore();
    try {
        const snapshot = await db
            .collection("Users")
            .where("_publicId", "==", publicId)
            .limit(1)
            .get();

        if (snapshot.empty) throw new Error("User not exists.")

        const doc = snapshot.docs[0];
        const userData = doc.data() as UserData;
        return { userData, uid: doc.id };
    } catch (err) {
        throw err;
    }
};
