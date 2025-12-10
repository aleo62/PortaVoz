import { admin } from "@/firebase";
import User, { RequestUserType, UserData } from "@/models/User.model";

export const getUsersService = async (
    user: RequestUserType,
    name: string,
    page: number,
    limit: number
) => {
    const usersProps: any = user.isAdmin
        ? {}
        : {
              username: 1,
              fName: 1,
              lName: 1,
              image: 1,
              "meta.counters.postsCount": 1,
          };

    const users = await User.find(
        {
            _id: { $ne: user.uid },
            username: { $regex: name, $options: "i" },
        },
        usersProps
    )
        .skip((page - 1) * limit)
        .limit(limit);

    const count = await User.countDocuments({
        _id: { $ne: user.uid },
        username: { $regex: name },
    });

    return { count, users };
};

export const getUserByIdService = async (userId: string, uid: string) => {
    const user = await User.aggregate([
        { $match: { _id: userId } },

        {
            $project:
                userId !== uid
                    ? {
                          username: 1,
                          fName: 1,
                          lName: 1,
                          image: 1,
                          banner: 1,
                          about: 1,
                          "meta.counters.following": 1,
                          "meta.counters.followers": 1,
                          "meta.counters.postsCount": 1,
                      }
                    : {
                          username: 1,
                          fName: 1,
                          lName: 1,
                          email: 1,
                          image: 1,
                          banner: 1,
                          about: 1,
                          meta: 1,
                      },
        },

        {
            $lookup: {
                from: "follows",
                let: { targetUser: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$following", "$$targetUser"] },
                                    { $eq: ["$follower", uid] },
                                ],
                            },
                        },
                    },
                    { $limit: 1 },
                ],
                as: "following",
            },
        },

        {
            $addFields: {
                isFollowing: { $gt: [{ $size: "$following" }, 0] },
            },
        },

        {
            $project: {
                following: 0,
            },
        },
    ]);

    return { user: user[0] };
};

export const createUserService = async (
    uid: string,
    email: string,
    body: any
) => {
    let user;
    const exists = await User.findById(uid);
    if (exists) {
        user = exists;
    } else {
        user = await User.create({
            _id: uid,
            email: email,
            username: body.fName,
            fName: body.fName,
            lName: body.lName,
            image: body.image,
        });
    }

    return { user };
};

export const deleteUserService = async (userId: string) => {
    const user = await User.findById(userId);
    if (user!.role === "superadmin") {
        throw new Error("Not allowed to delete superadmin");
    }

    await User.deleteOne({ _id: userId });
    await admin.auth().deleteUser(userId);
};

export const revokeUserSessionsService = async (userId: string) => {
    await admin.auth().revokeRefreshTokens(userId);
};

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

export const getPreferencesByUser = async (userId: string) => {
    const user = await fetchUser(userId);
    return user.meta.preferences;
};

export const getPreferencesByField = async (
    userId: string,
    field: "notifications"
) => {
    const user = await fetchUser(userId);
    return user.meta.preferences[field];
};

export const updateUserPreferenceService = async (
    userId: string,
    path: string,
    value: any
) => {
    const updatePath = `meta.preferences.${path}`;
    const result = await User.updateOne(
        { _id: userId },
        { $set: { [updatePath]: value } }
    );
    return result;
};

export const makeUserAdminService = async (userId: string) => {
    await User.updateOne({ _id: userId }, { $set: { role: "admin" } });
    await admin.auth().setCustomUserClaims(userId, { admin: true, mod: true });
};

export const makeUserModeratorService = async (userId: string) => {
    await User.updateOne({ _id: userId }, { $set: { role: "moderator" } });
    await admin.auth().setCustomUserClaims(userId, { mod: true });
};

export const removeAdminRoleService = async (userId: string) => {
    await User.updateOne({ _id: userId }, { $set: { role: "user" } });
    await admin
        .auth()
        .setCustomUserClaims(userId, { admin: false, mod: false });
};

export const removeModeratorRoleService = async (userId: string) => {
    await User.updateOne({ _id: userId }, { $set: { role: "user" } });
    await admin.auth().setCustomUserClaims(userId, { mod: false });
};
