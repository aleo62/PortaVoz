import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChangeImage() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ newImage, folder }: { newImage: File, folder?: string }) => Server.changeImage(newImage, token!, folder),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
