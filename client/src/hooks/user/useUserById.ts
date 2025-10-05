import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useQuery } from "@tanstack/react-query";

export function useUserById(userIdProp?: string) {
    const { user } = useStoreUser();
    const userId = userIdProp ?? user?._id ?? null;
    const token = user?.token;

    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => Server.getUserById(userId!, token!),
        enabled: !!token && !!userId,
        staleTime: 0,
    });
}
