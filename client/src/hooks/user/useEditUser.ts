import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useEditUser() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userData, userId }: { userData: FormData; userId: string }) =>
            Server.editUser(userData, userId, token!),
        onSuccess: (userId) => {
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
