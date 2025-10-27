import { registerUserGoogle } from "@/firebase/firebaseFunctions";
import { Widgets } from "./Widgets";

export const GoogleButton = ({ small }: { small?: boolean }) => {
    const handleGoogleLogin = async () => {
        await registerUserGoogle();
    };

    return (
        <Widgets onClick={() => handleGoogleLogin()}>
            <img
                src={
                    "https://res.cloudinary.com/di5bma0gm/image/upload/v1759595925/google_siwzjm.png"
                }
                alt=""
                width={27}
            />
            {!small && "Entrar com o Google"}
        </Widgets>
    );
};
