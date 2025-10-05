import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChatByUsers() {
    const { user } = useStoreUser();
    const token = user?.token;

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ otherUserId }: { otherUserId: string }) =>
            Server.getChatByUserId(token!, otherUserId),

        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },

        onSettled: (_data, _err, { otherUserId }) => {
            queryClient.invalidateQueries({ queryKey: ["chats", otherUserId] });
        },
    });
}
