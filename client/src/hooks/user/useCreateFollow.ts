import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFollow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (followingId: string) => Server.createFollow(followingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
