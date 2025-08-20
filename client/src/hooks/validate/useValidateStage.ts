import { PostData } from "@/utils/types/postDataType";
import { Server } from "@api/Server";
import { useMutation } from "@tanstack/react-query";

export function useValidateStage() {
    return useMutation({
        mutationFn: ({ formData, stage }: { formData: Partial<PostData>; stage: string }) =>
            Server.validateStage(formData, stage),
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
