import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userData, userId }: { userData: FormData; userId: string }) =>
            Server.updateUser(userData, userId, token!),
        onSuccess: (_response, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
