import { Timestamp } from "firebase/firestore";

export type UserData = {
    _publicId: string;
    fName: string;
    lName: string;
    email: string;
    image: string;
    banner: string;
    phone: string;
    about: string;
    remainingReports: number;
    reportsResetAt: Timestamp | Date;
    totalReports: number;
    verified: boolean;
    verificationCode: string;
    codeExpiresAt: number;
    followers: number;
    following: number;
};
