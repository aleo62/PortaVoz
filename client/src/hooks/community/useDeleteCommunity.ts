import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (communityId: string) => Server.deleteCommunity(communityId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["communities"] });
        },
    });
};
