import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLeaveCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: Server.leaveCommunity,
        onSuccess: (_, communityId) => {
            queryClient.invalidateQueries({ queryKey: ["community", communityId] });
        },
    });
};
