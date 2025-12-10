import { Server } from "@/api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCommunities = (
    search?: string,
    members?: "desc" | "asc",
    date?: "desc" | "asc",
) => {
    return useInfiniteQuery({
        queryKey: ["communities", search],
        queryFn: async ({ pageParam = 1 }) => {
            return await Server.getCommunities(pageParam, 10, search, members, date);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.communities.length === 10 ? nextPage : undefined;
        },
    });
};
