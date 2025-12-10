import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";


export function useFollowers(userId: string, enabled: boolean) {
    return useInfiniteQuery({
        queryKey: ["followers", userId],
        
        queryFn: ({ pageParam }) => Server.getFollowers(userId, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
            
        initialPageParam: 1,
        enabled,
    });
}