import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReportCategoryData } from "@/types/categoryDataType";

export function useUpdateReportCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Omit<ReportCategoryData, "_id" | "createdAt">;
        }) => Server.updateReportCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("❌ Error updating category:", error);
        },
    });
}
