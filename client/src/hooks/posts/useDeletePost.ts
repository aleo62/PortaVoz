import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost() {
    const { user } = useStoreUser();
    const token = user?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => Server.deletePostById(id, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
