import { PublicUser } from "./userDataType";

export interface CommentData {
    _id: string;
    parentId: string;
    parentType: "Post" | "Comment";
    user: PublicUser;
    content: string;
    upvotesCount: number;
    repliesCount: number;
    replies: string[];
    createdAt: Date;
    isUpvoted: boolean;
}
