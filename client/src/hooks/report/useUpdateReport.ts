import { Server } from "@/api/Server";
import { ReportData } from "@/types/reportDataType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reportId, status }: { reportId: string; status: ReportData["status"] }) =>
            Server.updateReport(reportId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};
