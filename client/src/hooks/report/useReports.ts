import { Server } from "@/api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useReports = () => {
    return useInfiniteQuery({
        queryKey: ["reports"],
        queryFn: ({ pageParam = 1 }) => Server.getReports(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === 0 ? undefined : allPages.length + 1;
        },
        initialPageParam: 1,
    });
};
