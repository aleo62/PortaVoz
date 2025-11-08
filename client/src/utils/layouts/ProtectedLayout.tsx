import { Loader } from "@/components/ui/Loader";
import { useStoreUser } from "@/stores/userStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ProtectedLayoutProps = {
    children: React.ReactNode;
    onlyGuest?: boolean;
    onlyAdmin?: boolean;
};

export const ProtectedLayout = ({
    children,
    onlyGuest = false,
    onlyAdmin,
}: ProtectedLayoutProps) => {
    const { auth, user, isLoadingUser } = useStoreUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoadingUser || location.pathname === "/auth/verify") return;

        if (!onlyGuest && !auth) navigate("/auth/login");
        if (onlyGuest && auth) navigate("/feed");
        if (auth && user && !user.isVerified)
            navigate("/not-verified");
        if (onlyAdmin && auth && user && !user.claims?.admin) navigate("/");
    }, [isLoadingUser, auth, onlyAdmin, onlyGuest]);

    if(isLoadingUser) return <Loader isLoading />;
    return (
        <>
            {children}
        </>
    );
};
