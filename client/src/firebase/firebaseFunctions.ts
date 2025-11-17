import { Server } from "@/api/Server";
import { useStoreUser } from "@/stores/userStore";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from ".";

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
        await createUserWithEmailAndPassword(auth, email, password);

        await Server.createUser({ fName, lName });
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
        const exists = await Server.getUserById(user.uid);

        if (!exists) {
            await Server.createUser({
                fName: user.displayName?.split(" ")[0]!,
                lName: user.displayName?.split(" ")[1]!,
                image: user.photoURL!,
            });
        }
    } catch (err) {
        throw err;
    } finally {
        setIsLoadingUser(false);
    }
};

export const registerUserFacebook = async () => {
    const { setIsLoadingUser } = useStoreUser.getState();
    try {
        const facebookUser = await signInWithPopup(auth, facebookProvider);
        if (!facebookUser) return;

        setIsLoadingUser(true);
        const user = facebookUser.user;
        const exists = await Server.getUserById(user.uid);

        if (!exists) {
            await Server.createUser(
                {
                    fName: user.displayName?.split(" ")[0]!,
                    lName: user.displayName?.split(" ")[1]!,
                    image: user.photoURL!,
                }
            );
        }
    } catch (err) {
        throw err;
    } finally {
        setIsLoadingUser(false);
    }
};
