import { Server } from "@/api/Server";
import { useQuery } from "@tanstack/react-query";

export const useCommunity = (communityId: string) => {
    return useQuery({
        queryKey: ["community", communityId],
        queryFn: async () => {
            return await Server.getCommunityById(communityId);
        },
        enabled: !!communityId,
    });
};
