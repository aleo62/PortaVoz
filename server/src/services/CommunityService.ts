import config from "@/config";
import Community, { CommunityData } from "@/models/Community.model";
import CommunityMembership from "@/models/CommunityMembership.model";
import { generateId } from "@/utils/generateId";
type CommunityWithJoinStatus = ReturnType<CommunityData["toObject"]> & {
    isJoined: boolean;
};

const resolveCommunityResponse = async (
    community: CommunityData,
    userId?: string,
): Promise<CommunityData | CommunityWithJoinStatus> => {
    if (!userId) {
        return community;
    }

    const membership = await CommunityMembership.findOne({
        userId,
        communityId: community._id,
    });

    return {
        ...community.toObject(),
        isJoined: !!membership,
    };
};

const resolveCommunitiesResponse = async (
    communities: CommunityData[],
    userId?: string,
): Promise<(CommunityData | CommunityWithJoinStatus)[]> => {
    if (!userId) {
        return communities;
    }

    return Promise.all(
        communities.map((community) =>
            resolveCommunityResponse(community, userId),
        ),
    );
};

export const createCommunityService = async (
    data: Partial<CommunityData>,
    userId: string,
) => {
    const community = await Community.create({
        _id: generateId(config.SYSTEM_ID_SIZE, "CM_"),
        ...data,
    });

    await CommunityMembership.create({
        userId,
        communityId: community._id,
        role: "moderator",
    });

    return community;
};

export const getCommunitiesService = async (
    page: number,
    limit: number,
    search?: string,
    userId?: string,
) => {
    const query: any = {};
    if (search) {
        query.name = { $regex: search, $options: "i" };
    }

    const communities = await Community.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ membersCount: -1 });

    const count = await Community.countDocuments(query);

    const communitiesWithJoinStatus = await resolveCommunitiesResponse(
        communities,
        userId,
    );

    return { communities: communitiesWithJoinStatus, count };
};

export const getCommunityByIdService = async (
    communityId: string,
    userId?: string,
) => {
    const community = await Community.findById(communityId);
    if (!community) throw new Error("Community not found");

    return await resolveCommunityResponse(community, userId);
};

export const updateCommunityService = async (
    communityId: string,
    data: Partial<CommunityData>,
) => {
    const community = await Community.findByIdAndUpdate(communityId, data, {
        new: true,
    });
    if (!community) throw new Error("Community not found");
    return community;
};

export const deleteCommunityService = async (communityId: string) => {
    const community = await Community.findByIdAndDelete(communityId);
    if (!community) throw new Error("Community not found");
    await CommunityMembership.deleteMany({ communityId });
    return community;
};

export const joinCommunityService = async (
    userId: string,
    communityId: string,
) => {
    const community = await Community.findById(communityId);
    if (!community) throw new Error("Community not found");

    const existingMembership = await CommunityMembership.findOne({
        userId,
        communityId,
    });
    if (existingMembership) throw new Error("User already a member");

    await CommunityMembership.create({
        userId,
        communityId,
    });

    await Community.findByIdAndUpdate(communityId, {
        $inc: { membersCount: 1 },
    });

    return { message: "Joined community successfully" };
};

export const leaveCommunityService = async (
    userId: string,
    communityId: string,
) => {
    const membership = await CommunityMembership.findOneAndDelete({
        userId,
        communityId,
    });
    if (!membership) throw new Error("Membership not found");

    await Community.findByIdAndUpdate(communityId, {
        $inc: { membersCount: -1 },
    });

    return { message: "Left community successfully" };
};

export const getCommunityMembersService = async (
    communityId: string,
    page: number,
    limit: number,
) => {
    const members = await CommunityMembership.find({ communityId })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("userId", "fName lName username image");

    const count = await CommunityMembership.countDocuments({ communityId });

    return { members, count };
};

export const getUserCommunitiesService = async (
    userId: string,
    page: number,
    limit: number,
) => {
    const memberships = await CommunityMembership.find({ userId })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("communityId");

    const count = await CommunityMembership.countDocuments({ userId });

    const communities = memberships
        .filter((m: any) => m.communityId)
        .map((m: any) => ({
            ...m.communityId.toObject(),
            isJoined: true,
        }));

    return { communities, count };
};
