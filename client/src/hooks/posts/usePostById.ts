import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useQuery } from "@tanstack/react-query";

export function usePostById(id: string, enabled: boolean) {
    const { user } = useStoreUser();
    const token = user?.token;

    return useQuery({
        queryKey: ["posts", id],
        queryFn: () => Server.getPostById(id, token!),
        enabled: !!token && !!id && enabled,
    });
}
