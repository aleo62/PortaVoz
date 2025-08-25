import { generateVerificationCode } from "@/utils/generateCode";
import { generateId } from "@/utils/generateId";
import { sendVerificationEmail } from "@/utils/sendEmail";
import { UserData } from "@/utils/types/userDataType";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db, googleProvider } from ".";

type registerUserEmailAndPasswordProps = {
    email: string;
    password: string;
    fName: string;
    lName: string;
    image?: string;
};

type createUserDocProps = {
    fName: string;
    lName: string;
    image?: string;
};

// Criando o documento do Usuário

const createUserDoc = async ({ fName, lName, image }: createUserDocProps) => {
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
            image: image
                ? image
                : "https://res.cloudinary.com/di5bma0gm/image/upload/v1748032813/default_image_wroapp.png",
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
    }
};

// Registrando com Email e Password

export const registerUserEmailAndPassword = async ({
    fName,
    lName,
    email,
    password,
    image,
}: registerUserEmailAndPasswordProps) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await createUserDoc({ fName, lName, image });
    } catch (err) {
        throw err;
    }
};

export const registerUserGoogle = async () => {
    try {
        const googleUser = await signInWithPopup(auth, googleProvider);
        const user = googleUser.user;

        await createUserDoc({
            fName: user.displayName?.split(" ")[0]!,
            lName: user.displayName?.split(" ")[1]!,
            image: user.photoURL!,
        });
    } catch (err) {
        throw err;
    }
};
