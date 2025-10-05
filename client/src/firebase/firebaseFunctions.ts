import { Server } from "@/api/Server";
import { useUserById } from "@/hooks/user/useUserById";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from ".";

type registerUserEmailAndPasswordProps = {
    email: string;
    password: string;
    fName: string;
    lName: string;
    image?: string;
};

export const registerUserEmailAndPassword = async ({
    fName,
    lName,
    email,
    password,
}: registerUserEmailAndPasswordProps) => {
    try {
        const user = (await createUserWithEmailAndPassword(auth, email, password)).user;
        const token = await user.getIdToken();

        await Server.createUser({ fName, lName }, token);

        await sendEmailVerification(user);
    } catch (err) {
        throw err;
    }
};

export const registerUserGoogle = async () => {
    try {
        const googleUser = await signInWithPopup(auth, googleProvider);
        const user = googleUser.user;
        const exists = await useUserById(user.uid);

        if (!exists) {
            const token = await user.getIdToken();
            await await Server.createUser(
                {
                    fName: user.displayName?.split(" ")[0]!,
                    lName: user.displayName?.split(" ")[1]!,
                    image: user.photoURL!,
                },
                token,
            );
        }
    } catch (err) {
        throw err;
    }
};
