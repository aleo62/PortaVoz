import { useQuery } from "@tanstack/react-query";
import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";

export function usePosts() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useQuery({
        queryKey: ["posts"],
        queryFn: () => Server.getAllPosts(token!),
        enabled: !!token
    });
}
