import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteReportCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => Server.deleteReportCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("❌ Error deleting category:", error);
        },
    });
}
