import admin from "@/firebase/admin";
import { UserData } from "@/utils/types/userDataType";

export const fetchUid = async (uid: string): Promise<UserData | Error> => {
    const userDoc = await admin.firestore().doc(`Users/${uid}`).get();
    if (!userDoc.exists) throw new Error("No User found");

    return userDoc.data() as UserData;
};
