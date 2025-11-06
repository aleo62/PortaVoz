import User, { UserData } from "@/models/User.model";

export const fetchUser = async (uid: string): Promise<UserData> => {
    const userData = (await User.findById(uid)) as UserData;
    if (!userData) throw new Error("No User found");

    return userData;
};

export const verifyRemainingReports = async (
    userId: string,
    isAdmin: boolean
) => {
    const user = await fetchUser(userId);

    const now = new Date();
    const remaining = user.meta.limits.remainingReports;
    const resetAt = new Date(user.meta.limits.reportsResetAt);

    if (remaining > 0 || isAdmin)
        return { canReport: true, remaining, resetAt };
    if (resetAt <= now) {
        const newDate = new Date(now);
        newDate.setDate(now.getDate() + 7);

        await User.updateOne(
            { _id: userId },
            {
                $set: {
                    "meta.limits.remainingReports": 2,
                    "meta.limits.reportsResetAt": newDate,
                },
            }
        );

        return { canReport: true, remaining, resetAt };
    }
    return { canReport: false, remaining, resetAt };
};
