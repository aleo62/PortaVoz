import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFollow() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (followingId: string) => Server.deleteFollow(followingId),
        onSuccess: (_, followingId) => {
            queryClient.invalidateQueries({
                queryKey: ["user", followingId],
            });
        },
    });
}
