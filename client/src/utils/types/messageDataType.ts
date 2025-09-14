export interface MessageData {
    _id: string;
    chatId: string;
    senderId: string;
    text: string;
    deleted: Record<string, boolean>
    createdAt: Date;
}