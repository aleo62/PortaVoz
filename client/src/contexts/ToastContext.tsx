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
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            className: "toastSuccess",
        });
    };

    const errorToast = (message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            className: "toastError",
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
