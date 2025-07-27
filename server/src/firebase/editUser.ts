import admin from "./admin";
import { fetchUid } from "./fetchUid";
import { UserData } from "@/utils/types/userDataType";

export const editUser = async (uid: string, newUserData: Partial<UserData>) => {
    try {
        const userData = (await fetchUid(uid)) as UserData;
        const editedUser = await admin
            .firestore()
            .doc(`Users/${uid}`)
            .set({ ...userData, ...newUserData });
        return editedUser;
    } catch (err) {
        return err;
    }
};
