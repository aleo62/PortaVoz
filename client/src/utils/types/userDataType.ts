import { Timestamp } from "firebase/firestore";

export type UserData = {
    _publicId: string;
    username: string;
    fName: string;
    lName: string;
    email: string;
    image: string;
    banner: string;
    about: string;

    meta: {
        counters: {
            followers: number;
            following: number;
            unreadNotifications: number;
        };
        limits: {
            remainingReports: number;
            totalReports: number;
            reportsResetAt: Timestamp | Date | null;
        };
        timestamps?: {
            updatedAt?: Timestamp | Date | null;
            lastSeen?: Timestamp | Date | null;
        };
        settings?: {
            darkMode?: boolean;
            language?: string;
        };
    };
};
