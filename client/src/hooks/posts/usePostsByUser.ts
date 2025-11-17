import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePostsByUser(userId: string) {
    return useInfiniteQuery({
        queryKey: ["posts", userId],
        queryFn: ({ pageParam }) => Server.getPostsByUser(userId!, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!userId,
    });
}
