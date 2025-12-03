import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reportId: string) => Server.deleteReport(reportId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};
