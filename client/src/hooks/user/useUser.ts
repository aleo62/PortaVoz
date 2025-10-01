import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

export function useUserById(userIdProp?: string) {
    const { userDecoded } = useUser();
    const userId = userIdProp ?? userDecoded?.uid ?? null;
    const token = userDecoded?.token;

    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => Server.getUserById(userId!, token!),
        enabled: !!token && !!userId,
        staleTime: 0,
    });
}
