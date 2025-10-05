export interface NotificationData {
    _id: string,
    userId: string;
    senderId: string;
    senderImage: string;
    title: string;
    content: string;
    href: string;
    type: "Comment" | "Vote" | "Follow";
    preview?: string;
}
