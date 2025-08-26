export interface NotificationData {
    _id: string,
    userId: string;
    senderId: string;
    senderPhoto: string;
    title: string;
    content: string;
    href: string;
    type: "Comment" | "Vote" | "Follow";
    preview?: string;
}
