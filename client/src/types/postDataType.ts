import z from "zod";
import { PublicUser } from "./userDataType";

export interface PostData {
    _id: string;
    user: PublicUser;
    title: string;
    desc: string;
    images: string[] | File[];
    hashtags: HashtagData[];
    location: LocationData;
    address: string;
    upvotesCount: number;
    repostsCount: number;
    commentsCount: number;
    status: "ativo" | "resolvido" | "oculto";
    isUpvoted: boolean;
    isReposted: boolean;
    isSaved: boolean;
    createdAt: string;
    communityIds?: string[];
    visibility?: "global" | "communities" | "both";
}

export interface RequestPostData {
    title: string;
    desc: string;
    images: File[];
    hashtags: string[];
    location: LocationData;
    address: string;
    communityIds?: string[];
    visibility?: "global" | "communities" | "both";
}

export type UserPostData = PostData & {
    kind: "post" | "repost";
    activityDate: string;
    repostId: string;
    repostedAt: string;
    repostedBy: PublicUser;
};

type LocationData = {
    latitude: number;
    longitude: number;
};

type HashtagData = {
    _id: string;
    content: string;
};

export const postSchema = z.object({
    title: z.string().min(3).max(50),
    desc: z.string().min(10).max(500),
    images: z.array(z.any()).min(1),
    address: z.string().min(3),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
    }),
    hashtags: z.array(z.string()).min(1),
    communities: z.array(z.string()).optional(),
    postToFeed: z.boolean().optional(),
});
