import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useChats() {
    const { user } = useStoreUser();
    const token = user?.token;

    return useInfiniteQuery({
        queryKey: ["chats"],
        queryFn: ({ pageParam }) => Server.getChats(token!, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token,
    });
}
