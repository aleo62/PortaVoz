import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: Server.deleteChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["chats"] });
        },
    });
};
