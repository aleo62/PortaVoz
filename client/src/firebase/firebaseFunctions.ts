import { createUserService } from "@/services/users/createUser";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, googleProvider } from ".";

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

        await createUserService({ fName, lName }, token);

        await sendEmailVerification(user);
    } catch (err) {
        throw err;
    }
};

export const registerUserGoogle = async () => {
    try {
        const googleUser = await signInWithPopup(auth, googleProvider);
        const user = googleUser.user;

        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            const token = await user.getIdToken();
            await createUserService(
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
