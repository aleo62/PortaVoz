import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => Server.deletePostById(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}
