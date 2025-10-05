import { Loader } from "@/components/ui/Loader";
import { useStoreUser } from "@/stores/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

    useEffect(() => {
        if (isLoadingUser) return;

        if (onlyGuest && user) navigate("/feed");
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
