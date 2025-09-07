export interface MessageData {
    chatId: string;
    senderId: string;
    text: string;
    deleted: Record<string, boolean>
    createdAt: Date;
}