export interface CommentData {
    _id: string;
    parentId: string;
    parentType: "Post" | "Comment";
    user: {
        _id: string;
        username: string;
        image: string;
    }
    content: string;
    upvotesCount: number;
    repliesCount: number;
    replies: string[];
    createdAt: Date;
    isUpvoted: boolean;
}
