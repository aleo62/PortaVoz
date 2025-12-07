import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteSave() {
    const queryClient = useQueryClient();
    const { user } = useStoreUser();

    return useMutation({
        mutationFn: (postId: string) => Server.deleteSave(user!._id, postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["saves"] });
        },
    });
}
