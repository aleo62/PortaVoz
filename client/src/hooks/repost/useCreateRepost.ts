import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateRepost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId: string) => Server.createRepost(postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
