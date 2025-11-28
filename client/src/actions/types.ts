import { ModalContextType } from "@/contexts/ModalContext";
import { NavigateFunction } from "react-router-dom";

export type DropdownActionContext = {
    type?: "post" | "comment" | "user";
    id?: string;
    onDelete?: () => void;
};

export type DropdownActionProps = {
    context: DropdownActionContext;
    openModal?: ModalContextType["openModal"];
    successToast?: (msg: string) => void;
    navigate?: NavigateFunction;
};
