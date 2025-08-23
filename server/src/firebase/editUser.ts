import { UserData } from "@/utils/types/userDataType";
import admin from "./admin";

export const editUser = async (uid: string, newUserData: Partial<UserData>) => {
    try {
        const editedUser = await admin
            .firestore()
            .doc(`Users/${uid}`)
            .set(newUserData, { merge: true });
        return editedUser;
    } catch (err) {
        return err;
    }
};
