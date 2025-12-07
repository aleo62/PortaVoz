import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCommunity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: Server.createCommunity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["communities"] });
        },
    });
};
