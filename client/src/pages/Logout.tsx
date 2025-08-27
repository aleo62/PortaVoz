import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();

    const auth = getAuth();

    signOut(auth).then(() => {
        localStorage.setItem("cpfWarning", "false");
        navigate("/auth/login");
    });

    return <></>;
};
