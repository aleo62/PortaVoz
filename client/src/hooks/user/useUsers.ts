import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useUsers(enabled: boolean, name?: string) {
    return useInfiniteQuery({
        queryKey: ["users"],
        queryFn: ({ pageParam }) => Server.getUsers(pageParam, name!),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled,
    });
}
