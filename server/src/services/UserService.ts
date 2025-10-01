import User, { UserData } from "@/models/User.model";

export const fetchUser = async (uid: string): Promise<UserData> => {
    const userData = (await User.findById(uid)) as UserData;
    if (!userData) throw new Error("No User found");

    return userData;
};
