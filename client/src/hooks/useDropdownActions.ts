import { RoutesPath } from "@/app/Routes";
import { useModal } from "@/contexts/ModalContext";
import { useNavigate } from "react-router-dom";

export type DropdownActionContext = {
    type?: "post" | "comment" | "user";
    id?: string;
    onDelete?: () => void;
};

export const useDropdownActions = () => {
    const { openModal } = useModal();
    const navigate = useNavigate();

    const actions: Record<string, (context: DropdownActionContext) => void> = {
        report: (context) => {
            openModal("report", {
                id: context.id,
                type: context.type,
            });
        },
        deletePost: (context) => {
            context.onDelete?.();
        },
        logout: () => {
            navigate(RoutesPath("Logout")!);
        },
        profile: () => {
            navigate(RoutesPath("Profile")!);
        },
        settings: () => {
            openModal("settings", {});
        },
    };

    const handleAction = (actionKey: string, context: DropdownActionContext = {}) => {
        const action = actions[actionKey];
        if (action) {
            action(context);
        }
    };

    return { handleAction };
};
