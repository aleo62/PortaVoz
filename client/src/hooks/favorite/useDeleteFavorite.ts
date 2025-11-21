import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => Server.deleteFavorite(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
