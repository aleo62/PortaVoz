import { ReportCategoryData } from "@/types/categoryDataType";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateReportCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<ReportCategoryData, "_id" | "createdAt">) =>
            Server.createReportCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
            console.error("❌ Error creating category:", error);
        },
    });
}
