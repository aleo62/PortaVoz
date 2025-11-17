export interface UserData {
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
        };
        limits: {
            remainingReports: number;
            reportsResetAt: Date;
            totalReports: number;
        };
    };
    claims?: Record<string, any>;
    isVerified?: boolean;
}
