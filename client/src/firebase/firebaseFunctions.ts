import { Server } from "@/api/Server";
import { useStoreUser } from "@/stores/userStore";
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
    const { setIsLoadingUser } = useStoreUser.getState();
    try {
        const googleUser = await signInWithPopup(auth, googleProvider);

        if (!googleUser) return;

        setIsLoadingUser(true);
        const user = googleUser.user;

        const token = await user.getIdToken(true);
        const exists = await Server.getUserById(user.uid, token);

        if (!exists) {
            const token = await user.getIdToken();
            await Server.createUser(
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
    } finally {
        setIsLoadingUser(false);
    }
};
