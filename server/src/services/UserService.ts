import { admin } from "@/firebase";
import User, { UserData } from "@/models/User.model";

export const getUsersService = async (
    uid: string,
    name: string,
    page: number,
    limit: number
) => {
    const users = await User.find(
        {
            _id: { $ne: uid },
            username: { $regex: name, $options: "i" },
        },
        { username: 1, fName: 1, lName: 1, image: 1 }
    )
        .skip((page - 1) * limit)
        .limit(limit);

    const count = await User.countDocuments({
        _id: { $ne: uid },
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
                                    { $eq: ["$userId", "$$targetUser"] },
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

export const deleteUserService = async (
    userId: string,
) => {
    await User.deleteOne({ _id: userId });
    await admin.auth().deleteUser(userId)
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
