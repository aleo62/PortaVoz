export interface UserData {
    _id: string;
    username: string;
    email: string;
    fName: string;
    lName: string;
    image: string | File;
    about?: string;
    banner?: string | File;
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
    token?: string;
    claims?: Record<string, any>;
    isVerified?: boolean;
}
