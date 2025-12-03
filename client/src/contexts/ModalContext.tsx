import { createContext, useContext } from "react";

export type ModalContextType = {
    closeModal: () => void;
    modalKey: string | undefined;
    openModal: (modalKey: string, props: Record<string, any>) => void;
    modalOpen: boolean;
};

export type ModalDefaultProps = {
    zIndex?: number;
};

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
