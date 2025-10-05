import { useStoreUser } from "@/stores/userStore";
import { PostData } from "@/utils/types/postDataType";
import { Server } from "@api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePost() {
    const { user } = useStoreUser();
    const token = user?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ formData }: { formData: Partial<PostData> }) =>
            Server.createPost(formData, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
