import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUser() {
    const { updateUser } = useStoreUser();

    return useMutation({
        mutationFn: ({ userData, userId }: { userData: FormData; userId: string }) =>
            Server.updateUser(userData, userId),
        onSuccess: (response) => {
            updateUser(response.user);
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
