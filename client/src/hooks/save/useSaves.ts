import { Server } from "@/api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useSaves(userId: string) {
    return useInfiniteQuery({
        queryKey: ["saves", userId],
        queryFn: ({ pageParam = 1 }) => Server.getSaves(userId, pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        enabled: !!userId,
    });
}
