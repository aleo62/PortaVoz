import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export function usePostsByUser(userIdProp?: string) {
    const { user } = useStoreUser();
    const userId = userIdProp ?? user?._id ?? null;
    const token = user?.token;

    return useInfiniteQuery({
        queryKey: ["posts", userId],
        queryFn: ({ pageParam }) => Server.getPostsByUser(userId!, token!, pageParam),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!token && !!userId,
    });
}
