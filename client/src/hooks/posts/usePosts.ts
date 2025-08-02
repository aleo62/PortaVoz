import { FiltersType } from "@/utils/types/filtersType";
import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePosts(filters: FiltersType) {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: ({ pageParam }) => Server.getAllPosts(token!, pageParam, filters),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token,
    });
}
