import { Server } from "@api/Server";
import { useQuery } from "@tanstack/react-query";

export function usePostById(id: string, enabled: boolean) {
    return useQuery({
        queryKey: ["posts", id],
        queryFn: () => Server.getPostById(id),
        enabled: !!id && enabled,
    });
}
