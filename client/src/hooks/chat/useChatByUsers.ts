import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChatByUsers() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ otherUserId }: { otherUserId: string }) =>
            Server.getChatByUserId(otherUserId),

        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },

        onSettled: (_data, _err, { otherUserId }) => {
            queryClient.invalidateQueries({ queryKey: ["chats", otherUserId] });
        },
    });
}
