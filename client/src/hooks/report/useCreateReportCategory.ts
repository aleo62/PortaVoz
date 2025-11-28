import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateReportCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { title: string; desc: string; severity: number, type?: string }) =>
            Server.createReportCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("❌ Error creating category:", error);
        },
    });
}
