import { auth, db, googleProvider } from "@/firebase";
import { useIsMobile } from "@/utils/isMobile";
import google from "@assets/images/icons/google.png";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { Widgets } from "./Widgets";
import { UserData } from "@/utils/types/userDataType";
import { generateId } from "@/utils/generateId";

export const GoogleButton = () => {
    const isMobile = useIsMobile();

    const handleGoogleLogin = async () => {
        try {
            // Login with google
            const googleUser = await signInWithPopup(auth, googleProvider);
            const user = googleUser.user;

            // Verify if the user exists
            const userRef = doc(db, "Users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(doc(db, "Users", user.uid), {
                    _publicId: generateId(20, "@_"),
                    email: user.email,
                    fName: user.displayName?.split(" ")[0] || "",
                    lName: user.displayName?.split(" ")[1] || "",
                    image:
                        user.photoURL ||
                        "https://res.cloudinary.com/di5bma0gm/image/upload/v1748032813/default_image_wroapp.png",
                    about: "",
                    banner: "",
                    followers: 0,
                    following: 0,
                    phone: "",
                    remainingReports: 2,
                    reportsResetAt: new Timestamp(10000, 10000),
                    totalReports: 0,
                    verified: true,
                    verificationCode: null,
                    codeExpiresAt: null,
                } as UserData);
            }
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    };

    return (
        <Widgets onClick={() => handleGoogleLogin()}>
            <img src={google} alt="" width={isMobile ? 20 : 25} />
            <p className="text-sm">Entrar com Google</p>
        </Widgets>
    );
};
