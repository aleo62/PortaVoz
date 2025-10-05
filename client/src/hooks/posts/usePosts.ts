import { useStoreUser } from "@/stores/userStore";
import { FiltersType } from "@/utils/types/filtersDataType";
import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePosts(filters: Partial<FiltersType>, enabled: boolean) {
    const { user } = useStoreUser();
    const token = user?.token;

    return useInfiniteQuery({
        queryKey: ["posts", filters],
        queryFn: ({ pageParam }) => Server.getAllPosts(token!, pageParam, filters),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token && enabled,
    });
}
