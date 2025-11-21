import { FiltersType } from "@/types/filtersDataType";
import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePosts(filters: Partial<FiltersType>, enabled: boolean) {
    return useInfiniteQuery({
        queryKey: ["posts", filters],
        queryFn: ({ pageParam }) => Server.getAllPosts(filters, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled,
    });
}
