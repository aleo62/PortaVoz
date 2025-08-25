import { generateVerificationCode } from "@/utils/generateCode";
import { generateId } from "@/utils/generateId";
import { sendVerificationEmail } from "@/utils/sendEmail";
import { UserData } from "@/utils/types/userDataType";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from ".";

type registerUserEmailAndPasswordProps = {
    email: string;
    password: string;
    fName: string;
    lName: string;
};

export const registerUserEmailAndPassword = async ({
    fName,
    lName,
    email,
    password,
}: registerUserEmailAndPasswordProps) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        if (user) {
            const verificationCode = generateVerificationCode();
            const codeExpiresAt = Date.now() + 5 * 60 * 1000;

            await setDoc(doc(db, "Users", user.uid), {
                _publicId: generateId(20, "@_"),
                username: fName,
                fName: fName,
                lName: lName,
                email: user.email,
                image: "https://res.cloudinary.com/di5bma0gm/image/upload/v1748032813/default_image_wroapp.png",
                about: "",
                banner: "",
                meta: {
                    counters: {
                        followers: 0,
                        following: 0,
                        unreadNotifications: 0,
                    },
                    limits: {
                        remainingReports: 2,
                        totalReports: 0,
                        reportsResetAt: new Timestamp(10000, 10000),
                    },
                    verification: {
                        codeHash: verificationCode,
                        expiresAt: codeExpiresAt,
                    },
                },

                verified: false,
            } as UserData);

            const expirationText = new Date(codeExpiresAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
            });

            sendVerificationEmail({
                email: user.email || "",
                passcode: verificationCode,
                time: expirationText,
            });

            return true;
        }
    } catch (err) {
        throw err;
    }

    return false;
};

const registerUserGoogle = async () => {};
