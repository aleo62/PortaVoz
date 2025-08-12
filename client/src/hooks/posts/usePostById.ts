import { useQuery } from "@tanstack/react-query";
import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";

export function usePostById(id: string, enabled: boolean) {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useQuery({
        queryKey: ["posts", id],
        queryFn: () => Server.getPostById(id, token!),
        enabled: !!token && !!id && enabled
        
    });
}
