import { registerUserGoogle } from "@/firebase/firebaseFunctions";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Widgets } from "./Widgets";

export const GoogleButton = () => {
    const isMobile = useIsMobile();

    const handleGoogleLogin = async () => {
        // Login with google
        await registerUserGoogle();
    };

    return (
        <Widgets onClick={() => handleGoogleLogin()}>
            <img
                src={
                    "https://res.cloudinary.com/di5bma0gm/image/upload/v1759595925/google_siwzjm.png"
                }
                alt=""
                width={isMobile ? 20 : 25}
            />
            <p className="text-sm">Entrar com Google</p>
        </Widgets>
    );
};
