import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePostsByUser(userId: string, type: "all" | "posts" | "reposts") {
    return useInfiniteQuery({
        queryKey: ["posts", userId, type],
        queryFn: ({ pageParam }) => Server.getPostsByUser(userId!, pageParam, type),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!userId,
    });
}
