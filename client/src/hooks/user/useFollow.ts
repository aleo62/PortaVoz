import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useQuery } from "@tanstack/react-query";

export function useFollow(followingId: string) {
    const { user } = useStoreUser();
    const token = user?.token;

    return useQuery({
        queryKey: ["follows", followingId],
        queryFn: () => Server.getFollowingById(token!, followingId),
        enabled: !!token && !!followingId,
    });
}
