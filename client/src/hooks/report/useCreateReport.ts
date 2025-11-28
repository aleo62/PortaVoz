import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateReport() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {
            category: string;
            reportedItemType: string;
            reportedItemId: string;
            desc: string;
        }) => Server.createReport(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
