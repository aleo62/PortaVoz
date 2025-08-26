import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useNotifications() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useInfiniteQuery({
        queryKey: ["notification", token],
        queryFn: ({ pageParam }) => Server.getNotifications(token!, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token,
    });
}
