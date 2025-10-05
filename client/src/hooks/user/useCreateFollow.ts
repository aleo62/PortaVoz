import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateFollow() {
    const { user } = useStoreUser();
    const token = user?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (followingId: string) => Server.createFollow(token!, followingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
