import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateComment() {
    const { user } = useStoreUser();
    const token = user?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content, parentId }: { content: string; parentId: string }) =>
            Server.createComment(content, parentId, token!),

        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },

        onSettled: (_data, _err, { parentId }) => {
            queryClient.invalidateQueries({ queryKey: ["comments", parentId] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
