import { Server } from "@api/Server";
import { useQuery } from "@tanstack/react-query";

export function useFollow(followingId: string) {
    return useQuery({
        queryKey: ["follows", followingId],
        queryFn: () => Server.getFollowingById(followingId),
        enabled: !!followingId,
    });
}
