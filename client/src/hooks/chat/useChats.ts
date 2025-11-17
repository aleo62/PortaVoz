import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useChats() {
    return useInfiniteQuery({
        queryKey: ["chats"],
        queryFn: ({ pageParam }) => Server.getChats(pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
    });
}
