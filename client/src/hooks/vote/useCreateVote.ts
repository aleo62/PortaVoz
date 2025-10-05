import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation } from "@tanstack/react-query";

export function useCreateVote() {
    const { user } = useStoreUser();
    const token = user?.token;

    return useMutation({
        mutationFn: (id: string) => Server.createVote(id, token!),
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
