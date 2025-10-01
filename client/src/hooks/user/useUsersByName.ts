import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useUsersByName(name: string, enabled: boolean) {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    return useInfiniteQuery({
        queryKey: ["users", name],
        queryFn: ({ pageParam }) => Server.getUsersByName(name, token!, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token && !!name && enabled,
    });
}
