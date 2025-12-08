import { IconCheck, IconX } from "@tabler/icons-react";
import { ReactNode, createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

type ToastContextType = {
    successToast: (message: string) => void;
    errorToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const successToast = (message: string) => {
        toast.success(message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            pauseOnHover: true,
            icon: <IconCheck className="text-green-600 dark:text-green-400" />,
            className:
                "!bg-green-100/80 dark:!bg-zinc-900/80 !backdrop-blur-md !border-2 !border-green-500 !text-zinc-800 dark:!text-zinc-200 !rounded-xl !shadow-xl !font-medium",
        });
    };

    const errorToast = (message: string) => {
        toast.error(message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            icon: <IconX className="text-red-600 dark:text-red-400" />,
            className:
                "!bg-red-100/80 dark:!bg-zinc-900/80 !backdrop-blur-md !border-2 !border-red-500 !text-zinc-800 dark:!text-zinc-200 !rounded-xl !shadow-xl !font-medium",
        });
    };

    return (
        <ToastContext.Provider value={{ successToast, errorToast }}>
            <ToastContainer />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
