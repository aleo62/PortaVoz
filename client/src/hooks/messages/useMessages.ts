import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMessages(chatId: string | null) {
    const { user } = useStoreUser();
    const token = user?.token;

    return useInfiniteQuery({
        queryKey: ["messages", chatId],
        queryFn: ({ pageParam }) => Server.getMessagesByChatId(token!, pageParam, chatId as string),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token && !!chatId,
    });
}
