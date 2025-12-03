import { useStoreUser } from "@/stores/userStore";
import { Server } from "@api/Server";
import { useQuery } from "@tanstack/react-query";

export function useUserPreferences(field: string) {
    const { user } = useStoreUser();
    const userId = user?._id ?? null;

    return useQuery({
        queryKey: ["userPreferences", userId, field],
        queryFn: () => Server.getUserPreferences(userId!, field),
        enabled: !!userId,
    });
}
