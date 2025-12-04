import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChatByUsers() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ otherUserId }: { otherUserId: string }) => Server.getChatByUserId(otherUserId),

        onSettled: (_data, _err) => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        },
    });
}
