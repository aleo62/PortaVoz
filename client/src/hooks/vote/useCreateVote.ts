import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useMutation } from "@tanstack/react-query";

export function useCreateVote() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useMutation({
        mutationFn: (id: string) => Server.createVote(id, token!),
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
