import { auth, db, googleProvider } from "@/firebase";
import { generateId } from "@/utils/generateId";
import { useIsMobile } from "@/utils/isMobile";
import { UserData } from "@/utils/types/userDataType";
import google from "@assets/images/icons/google.png";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Widgets } from "./Widgets";

export const GoogleButton = () => {
    const isMobile = useIsMobile();

    const handleGoogleLogin = async () => {
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
                reportsResetAt: null,
                totalReports: 0,
                verified: true,
                verificationCode: null,
                codeExpiresAt: null,
                createdAt: Date.now(),
            } as UserData);
        }
    };

    return (
        <Widgets onClick={() => handleGoogleLogin()}>
            <img src={google} alt="" width={isMobile ? 20 : 25} />
            <p className="text-sm">Entrar com Google</p>
        </Widgets>
    );
};
