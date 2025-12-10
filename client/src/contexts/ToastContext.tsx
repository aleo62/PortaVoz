import { createContext, useContext } from "react";

interface ToastContextType {
    successToast: (message: string, description?: string) => void;
    errorToast: (message: string, description?: string) => void;
    infoToast: (message: string, description?: string) => void;
    warningToast: (message: string, description?: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined
);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};