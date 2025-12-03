import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId: string) => Server.deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};
