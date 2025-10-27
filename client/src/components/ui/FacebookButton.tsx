import { registerUserFacebook } from "@/firebase/firebaseFunctions";
import { Widgets } from "./Widgets";

export const FacebookButton = ({ small }: { small?: boolean }) => {
    const handleFacebookLogin = async () => {
        await registerUserFacebook();
    };

    return (
        <Widgets onClick={() => handleFacebookLogin()}>
            <img
                src={
                    "https://res.cloudinary.com/di5bma0gm/image/upload/v1759595924/facebook_ry41ii.png"
                }
                alt="Facebook"
                width={27}
            />
            {!small && "Entrar com o Facebook"}
        </Widgets>
    );
};
