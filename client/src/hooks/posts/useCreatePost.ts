import { RequestPostData } from "@/types/postDataType";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ formData }: { formData: RequestPostData }) => Server.createPost(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error);
        },
    });
}
