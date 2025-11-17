import Follow from "@/models/Follow.model";
import User, { UserData } from "@/models/User.model";
import { Request } from "express";

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
    const user = await User.findById(
        userId,
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
            : {}
    );

    const isFollowing = !!(await Follow.findOne({
        userId,
        follower: uid,
    }));

    return { user, isFollowing };
};

export const createUserService = async (uid: string, email: string, body: any) => {
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
