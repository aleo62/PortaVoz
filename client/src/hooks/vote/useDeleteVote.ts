import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteVote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => Server.deleteVoteById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
