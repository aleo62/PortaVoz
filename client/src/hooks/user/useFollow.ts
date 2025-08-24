import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useQuery } from "@tanstack/react-query";

export function useFollow(followingId: string) {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useQuery({
        queryKey: ["follows", followingId],
        queryFn: () => Server.getFollowingById(token!, followingId),
        enabled: !!token && !!followingId,
    });
}
