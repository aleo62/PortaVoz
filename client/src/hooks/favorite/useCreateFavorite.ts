import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => Server.createFavorite(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
