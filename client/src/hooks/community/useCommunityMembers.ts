import { Server } from "@/api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCommunityMembers = (communityId: string) => {
    return useInfiniteQuery({
        queryKey: ["communityMembers", communityId],
        queryFn: async ({ pageParam = 1 }) => {
            return await Server.getCommunityMembers(communityId, pageParam);
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = allPages.length + 1;
            return lastPage.members.length === 10 ? nextPage : undefined;
        },
        enabled: !!communityId,
    });
};
