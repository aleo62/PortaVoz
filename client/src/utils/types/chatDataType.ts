export interface ChatData {
    _id: string;
    participants: [
        {
            _id: string;
            username: string;
            image: string;
        },
    ];
}
