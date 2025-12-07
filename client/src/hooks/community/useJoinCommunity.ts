import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useJoinCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: Server.joinCommunity,
        onSuccess: (_, communityId) => {
            queryClient.invalidateQueries({ queryKey: ["community", communityId] });
        },
    });
};
