export interface ChatData {
    _id: string;
    participants: [
        {
            _id: string;
            username: string;
            image: string;
        },
    ];
    unreadChatMessages: number;
    recentMessage: {
        text: string;
        senderId: string;
        createdAt: Date;
    };
    createdAt: Date;
}
