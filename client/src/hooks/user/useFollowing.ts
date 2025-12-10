import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";


export function useFollowing(userId: string, enabled: boolean) {
    return useInfiniteQuery({
        queryKey: ["following", userId],
        
        queryFn: ({ pageParam }) => Server.getFollowing(userId, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
            
        initialPageParam: 1,
        enabled,
    });
}