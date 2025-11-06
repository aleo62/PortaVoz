export interface NotificationData {
    _id: string,
    userId: string;
    sender: {
        image: string,
        user: string
    }
    message: string;
    href: string;
    type: "Comment" | "Vote" | "Follow";
    preview?: string;
    createdAt: Date;
}
