export type UserData = {
    _id: string;
    username: string;
    email: string;
    fName: string;
    lName: string;
    image: string;
    about?: string;
    banner?: string;
    meta: {
        counters: {
            followers: number;
            following: number;
            unreadNotifications: number;
            unreadChatMessages: number;
        };
        limits: {
            remainingReports: number;
            reportsResetAt: Date;
            totalReports: number;
        };
    };
    claims?: Record<string, any>;
    isVerified?: boolean;
    role?: "user" | "admin" | "moderator";
};

export type PublicUser = {
    _id: string;
    username: string;
    image: string;
};
