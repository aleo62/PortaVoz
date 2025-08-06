import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useComments(parentId: string) {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useInfiniteQuery({
        queryKey: ["comments", parentId],
        queryFn: ({ pageParam }) => Server.getCommentsByParentId(token!, pageParam, parentId),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token,
    });
}
