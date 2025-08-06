import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteComment() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => Server.deleteCommentById(id, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
