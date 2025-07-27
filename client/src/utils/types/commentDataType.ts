export interface CommentData {
    _id: string;
    parentId: string;
    parentType: "Post" | "Comment";
    userId: string;
    userName: string;
    userPhoto: string;
    content: string;
    upvotesCount: number;
    repliesCount: number;
    replies: string[];
    createdAt: Date;
    isUpvoted: boolean;
}
