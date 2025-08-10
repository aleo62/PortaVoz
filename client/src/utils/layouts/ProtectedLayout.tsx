import { AlertCPF } from "@/components/overlay/AlertCPF";
import { Loader } from "@/components/ui/Loader";
import { useUser } from "@/contexts/UserContext";
import { AnimatePresence } from "framer-motion";
import { Navigate } from "react-router-dom";

type ProtectedLayoutProps = {
    children: React.ReactNode;
    onlyGuest?: boolean;
    onlyAdmin?: boolean;
};

export const ProtectedLayout = ({ children, onlyGuest, onlyAdmin }: ProtectedLayoutProps) => {
    const { user, userDecoded, isFetching } = useUser();

    if (onlyGuest && user) {
        return <Navigate to="/editprofile" />;
    }
    if (!onlyGuest && !user && !isFetching) {
        return <Navigate to="/login" />;
    }
    if (onlyAdmin && !userDecoded?.claims.admin && !isFetching) {
        return <Navigate to="/" />;
    }

    return (
        <>
            {children}
            <AnimatePresence>{isFetching && <Loader />}</AnimatePresence>
            {user && <AlertCPF />}
        </>
    );
};
