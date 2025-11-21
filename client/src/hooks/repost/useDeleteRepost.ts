import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteRepost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => Server.deleteRepost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
