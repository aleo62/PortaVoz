import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useComments(parentId: string) {
    const { user } = useStoreUser();
    const token = user?.token;

    return useInfiniteQuery({
        queryKey: ["comments", parentId],
        queryFn: ({ pageParam }) => Server.getCommentsByParentId(token!, pageParam, parentId),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token,
    });
}
