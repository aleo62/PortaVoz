import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUser() {
    const { user, updateUser } = useStoreUser();
    const token = user?.token;

    return useMutation({
        mutationFn: ({ userData, userId }: { userData: FormData; userId: string }) =>
            Server.updateUser(userData, userId, token!),
        onSuccess: (response) => {
            updateUser(response.user);
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
