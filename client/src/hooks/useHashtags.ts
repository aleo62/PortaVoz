import { Server } from "@/api/Server";
import { useQuery } from "@tanstack/react-query";

export function useHashtags(search: string) {
    return useQuery({
        queryKey: ["hashtags", search],
        queryFn: async () => {
            const data = await Server.getHashtags(1, search);
            return data?.hashtags || [];
        },
        staleTime: 1000 * 60,
    });
}
