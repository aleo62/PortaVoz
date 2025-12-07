import {
    createCommunityService,
    deleteCommunityService,
    getCommunitiesService,
    getCommunityByIdService,
    getCommunityMembersService,
    joinCommunityService,
    leaveCommunityService,
    updateCommunityService,
} from "@/services/CommunityService";
import { uploadImage } from "@/services/ImageService";
import { NextFunction, Request, Response } from "express";

export const createCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        let imageUrl, bannerUrl;

        if (files?.image?.[0]) {
            imageUrl = await uploadImage(
                files.image[0].path,
                "communities_images"
            );
        }

        if (files?.banner?.[0]) {
            bannerUrl = await uploadImage(
                files.banner[0].path,
                "communities_banners"
            );
        }

        const communityData = {
            ...req.body,
            ...(imageUrl && { image: imageUrl }),
            ...(bannerUrl && { banner: bannerUrl }),
        };

        const community = await createCommunityService(
            communityData,
            req.user!.uid
        );
        res.status(201).json({ community });
    } catch (error: any) {
        next(error);
    }
};

export const getCommunities = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string;
        const userId = req.user?.uid;

        const { communities, count } = await getCommunitiesService(
            page,
            limit,
            search,
            userId
        );
        res.status(200).json({ communities, count });
    } catch (error: any) {
        next(error);
    }
};

export const getCommunityById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.user?.uid;
        const community = await getCommunityByIdService(req.params.id, userId);
        res.status(200).json({ community });
    } catch (error: any) {
        next(error);
    }
};

export const updateCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const community = await updateCommunityService(req.params.id, req.body);
        res.status(200).json({ community });
    } catch (error: any) {
        next(error);
    }
};

export const deleteCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await deleteCommunityService(req.params.id);
        res.status(200).json({ message: "Community deleted successfully" });
    } catch (error: any) {
        next(error);
    }
};

export const joinCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await joinCommunityService(req.user!.uid, req.params.id);
        res.status(200).json(result);
    } catch (error: any) {
        next(error);
    }
};

export const leaveCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await leaveCommunityService(
            req.user!.uid,
            req.params.id
        );
        res.status(200).json(result);
    } catch (error: any) {
        next(error);
    }
};

export const getCommunityMembers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const { members, count } = await getCommunityMembersService(
            req.params.id,
            page,
            limit
        );
        res.status(200).json({ members, count });
    } catch (error: any) {
        next(error);
    }
};
