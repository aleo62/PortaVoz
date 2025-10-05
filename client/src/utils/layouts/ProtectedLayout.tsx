import { useStoreUser } from "@/stores/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedLayoutProps = {
    children: React.ReactNode;
    onlyGuest?: boolean;
    onlyAdmin?: boolean;
};

export const ProtectedLayout = ({ children, onlyGuest, onlyAdmin }: ProtectedLayoutProps) => {
    const { user } = useStoreUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (onlyGuest && user) {
            navigate("/feed");
        }

        if (!onlyGuest && !user) {
            navigate("/auth/login");
        }

        if (onlyAdmin && user && !user.claims?.admin) {
            navigate("/");
        }
    }, [user, onlyGuest, onlyAdmin, navigate]);

    return <>{children}</>;
};
