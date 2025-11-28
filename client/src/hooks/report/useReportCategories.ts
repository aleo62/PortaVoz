import { Server } from "@api/Server";
import { useQuery } from "@tanstack/react-query";

export function useReportCategories(enabled: boolean, type?: string) {
    return useQuery({
        queryKey: ["categories", type],
        queryFn: () => Server.getReportCategories(type),
        enabled,
    });
}
