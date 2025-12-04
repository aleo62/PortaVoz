import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReadChatMessages = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (chatId: string) => Server.readChatMessages(chatId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        },
    });
};
