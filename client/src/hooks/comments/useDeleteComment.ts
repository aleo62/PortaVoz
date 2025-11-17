import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => Server.deleteCommentById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
