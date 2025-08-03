import { Server } from "@api/Server";
import { useUser } from "@contexts/UserContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChangeImage() {
    const { userDecoded } = useUser();
    const token = userDecoded?.token;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ newImage }: { newImage: File }) => Server.changeImage(newImage, token!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["images"] });
        },
        onError: (error) => {
            console.error("❌ Erro na mutation:", error, token);
        },
    });
}
