import { useUser } from "@/contexts/UserContext";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedLayoutProps = {
    children: React.ReactNode;
    onlyGuest?: boolean;
    onlyAdmin?: boolean;
};

export const ProtectedLayout = ({ children, onlyGuest, onlyAdmin }: ProtectedLayoutProps) => {
    const { userDecoded } = useUser();
    const [isFetching, setIsFetching] = useState(true);
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPaths = async () => {
            if (onlyGuest && user) {
                navigate("/feed");
                return;
            }

            if (!onlyGuest && !user && !isFetching) {
                navigate("/auth/login");
                return;
            }

            if (onlyAdmin && userDecoded && !userDecoded.claims?.admin) {
                navigate("/");
                return;
            }

            if (!onlyGuest && user) setIsFetching(false);
        };

        verifyPaths();
    }, [user, userDecoded, onlyGuest, onlyAdmin, navigate]);

    return <>{children}</>;
};
