import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useComments(parentId: string, enabled: boolean = true) {
    return useInfiniteQuery({
        queryKey: ["comments", parentId],
        queryFn: ({ pageParam }) => Server.getCommentsByParentId(parentId, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: enabled && !!parentId,
    });
}
