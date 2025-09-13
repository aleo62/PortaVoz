import { NotVerifiedOverlay } from "@/components/overlay/NotVerifiedOverlay";
import { Loader } from "@/components/ui/Loader";
import { useUser } from "@/contexts/UserContext";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedLayoutProps = {
    children: React.ReactNode;
    onlyGuest?: boolean;
    onlyAdmin?: boolean;
};

export const ProtectedLayout = ({ children, onlyGuest, onlyAdmin }: ProtectedLayoutProps) => {
    const { user, userDecoded, isFetching } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyPaths = async () => {
            if (onlyGuest && user) {
                return navigate("/feed");
            }
            if (!onlyGuest && !user && !isFetching) {
                return navigate("/auth/login");
            }
            if (onlyAdmin && !userDecoded?.claims.admin && userDecoded) {
                return navigate("/");
            }
        };

        verifyPaths();
    }, [isFetching, user]);

    return (
        <>
            {children}
            <AnimatePresence>{isFetching && <Loader />}</AnimatePresence>
            {
                <NotVerifiedOverlay
                    isOpen={
                        !!user &&
                        !user?.emailVerified &&
                        window.location.pathname !== "/auth/verify"
                    }
                    onClose={() => {}}
                />
            }
        </>
    );
};
