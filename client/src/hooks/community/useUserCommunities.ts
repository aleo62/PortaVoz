import { Server } from "@/api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useUserCommunities = (userId?: string) => {
    return useInfiniteQuery({
        queryKey: ["user-communities", userId],
        queryFn: async ({ pageParam = 1 }) => {
            if (!userId) return { communities: [], count: 0 };
            return await Server.getUserCommunities(userId, pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.communities.length === 10 ? nextPage : undefined;
        },
        enabled: !!userId,
    });
};
