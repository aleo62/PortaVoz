import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useMessages(chatId: string | null) {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useInfiniteQuery({
        queryKey: ["messages", chatId],
        queryFn: ({ pageParam }) => Server.getMessagesByChatId(token!, pageParam, chatId as string),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token && !!chatId,
    });
}
