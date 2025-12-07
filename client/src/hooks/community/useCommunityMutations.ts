import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCommunityMutations = () => {
    const queryClient = useQueryClient();

    const createCommunity = useMutation({
        mutationFn: Server.createCommunity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["communities"] });
        },
    });

    const joinCommunity = useMutation({
        mutationFn: Server.joinCommunity,
        onSuccess: (_, communityId) => {
            queryClient.invalidateQueries({ queryKey: ["community", communityId] });
        },
    });

    const leaveCommunity = useMutation({
        mutationFn: Server.leaveCommunity,
        onSuccess: (_, communityId) => {
            queryClient.invalidateQueries({ queryKey: ["community", communityId] });
        },
    });

    return { createCommunity, joinCommunity, leaveCommunity };
};
