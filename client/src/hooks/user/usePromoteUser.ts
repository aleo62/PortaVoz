import { Server } from "@/api/Server";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function usePromoteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            userId,
            role,
            action,
        }: {
            userId: string;
            role: "admin" | "moderator";
            action: "promote" | "demote";
        }) => {
            if (action === "promote") {
                if (role === "admin") {
                    return Server.promoteToAdmin(userId);
                } else {
                    return Server.promoteToModerator(userId);
                }
            } else {
                if (role === "admin") {
                    return Server.demoteFromAdmin(userId);
                } else {
                    return Server.demoteFromModerator(userId);
                }
            }
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            const actionText = variables.action === "promote" ? "promoted" : "demoted";
            alert(`User ${actionText} successfully!`);
        },
        onError: (error) => {
            console.error("❌ Error managing user role:", error);
            alert("Failed to update user role.");
        },
    });
}
