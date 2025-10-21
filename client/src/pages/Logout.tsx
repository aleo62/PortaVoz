import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const auth = getAuth();

    signOut(auth).then(() => {
        queryClient.invalidateQueries(["chats"] as InvalidateQueryFilters);

        navigate("/auth/login");
    });

    return <></>;
};
