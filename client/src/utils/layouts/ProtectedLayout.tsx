import { Loader } from "@/components/Loader";
import { useUser } from "@/contexts/UserContext";
import { Navigate } from "react-router-dom";

type ProtectedLayoutProps = {
    children: React.ReactNode;
    onlyGuest?: boolean;
    isLoading?: boolean;
};


export const ProtectedLayout = ({
    children,
    onlyGuest,
    isLoading = false,
}: ProtectedLayoutProps) => {
    const { user } = useUser();
    if (isLoading) {
        return <Loader />;
    }

    if (onlyGuest) {
        // Se for rota apenas para convidados, redireciona para /profile se estiver logado
        return user ? <Navigate to="/profile" /> : children;
    } else {
        // Se for rota protegida, redireciona para /login se não estiver logado
        return user ? children : <Navigate to="/login" />;
    }
};
