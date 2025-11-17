import { Server } from "@api/Server";
import { useMutation } from "@tanstack/react-query";

export function useCreateVote() {
    return useMutation({
        mutationFn: (id: string) => Server.createVote(id),
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
