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
    const { user, isLoadingUser } = useStoreUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isLoadingUser) return;

        if (onlyGuest && user) navigate("/feed");
        if (user && !user.isVerified && location.pathname !== "/auth/verify")
            navigate("/auth/not-verified");
        if (!onlyGuest && !user) navigate("/auth/login");
        if (onlyAdmin && user && !user.claims?.admin) navigate("/");
    }, [user, isLoadingUser, onlyGuest, onlyAdmin, navigate]);
    return (
        <>
            <Loader isLoading={isLoadingUser} />
            {children}
        </>
    );
};
