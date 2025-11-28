import { RoutesPath } from "@/app/Routes";
import { DropdownActionProps } from "./types";

export const dropdownActions = {
    report: ({ openModal, context }: DropdownActionProps) => {
        openModal!("report", {
            id: context.id,
            type: context.type,
        });
    },

    deletePost: ({ context }: DropdownActionProps) => {
        context.onDelete?.();
    },

    logout: ({ navigate }: DropdownActionProps) => {
        navigate!(RoutesPath("Logout")!);
    },

    profile: ({ navigate }: DropdownActionProps) => {
        navigate!(RoutesPath("Profile")!);
    },

    settings: ({ openModal }: DropdownActionProps) => {
        openModal!("settings", {});
    },
};
