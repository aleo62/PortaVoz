import { auth } from "@/firebase";
import { Server } from "@api/Server";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useNotifications(userIdProp?: string) {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (userIdProp) {
                setUserId(userIdProp ?? null);
            } else {
                setUserId(user?.uid ?? null);
            }
        });
        return unsubscribe;
    }, []);

    return useInfiniteQuery({
        queryKey: ["notification"],
        queryFn: ({ pageParam }) => Server.getNotifications(pageParam, userId!),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.hasMore ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!userId,
    });
}
