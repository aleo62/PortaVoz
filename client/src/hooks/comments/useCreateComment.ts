import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content, parentId }: { content: string; parentId: string }) =>
            Server.createComment(content, parentId),

        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },

        onSettled: (_data, _err, { parentId }) => {
            queryClient.invalidateQueries({ queryKey: ["comments", parentId] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
