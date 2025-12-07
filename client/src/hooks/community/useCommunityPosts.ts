import { Server } from "@/api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCommunityPosts = (communityId: string) => {
    return useInfiniteQuery({
        queryKey: ["posts", "community", communityId],
        queryFn: async ({ pageParam = 1 }) => {
            return await Server.getCommunityPosts(communityId, pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.hasMore ? nextPage : undefined;
        },
        enabled: !!communityId,
    });
};
