import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteComment() {
    const { user } = useStoreUser();
    const token = user?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => Server.deleteCommentById(id, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
