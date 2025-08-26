import { registerUserGoogle } from "@/firebase/firebaseFunctions";
import { useIsMobile } from "@/utils/isMobile";
import google from "@assets/images/icons/google.png";
import { Widgets } from "./Widgets";

export const GoogleButton = () => {
    const isMobile = useIsMobile();

    const handleGoogleLogin = async () => {
        // Login with google
        await registerUserGoogle();
    };

    return (
        <Widgets onClick={() => handleGoogleLogin()}>
            <img src={google} alt="" width={isMobile ? 20 : 25} />
            <p className="text-sm">Entrar com Google</p>
        </Widgets>
    );
};
