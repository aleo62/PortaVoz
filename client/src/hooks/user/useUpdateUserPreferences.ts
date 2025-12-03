import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserPreferences() {
    const { user } = useStoreUser();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ path, value }: { path: string; value: any }) =>
            Server.updateUserPreferences(user!._id, path, value),
        onSuccess: (_, variables) => {
            const field = variables.path.split(".")[0];
            queryClient.invalidateQueries({
                queryKey: ["userPreferences", user?._id, field],
            });
        },
        onError: (error) => {
            console.error("❌ Erro ao atualizar preferências:", error);
        },
    });
}
