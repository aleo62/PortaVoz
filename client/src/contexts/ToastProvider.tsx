import { IconCheck, IconX } from "@tabler/icons-react";
import { ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContext } from "./ToastContext";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const successToast = (message: string, description?: string) => {
        toast.success(
            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                        <IconCheck className="h-6 w-6 text-green-400" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-white">{message}</span>
                        {description && (
                            <span className="mt-0.5 text-sm text-gray-400">{description}</span>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => toast.dismiss()}
                    className="flex-shrink-0 rounded-lg bg-zinc-800/60 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-700/60"
                >
                    Entendi!
                </button>
            </div>,
            {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                icon: false,
                className:
                    "!bg-zinc-900/95 !backdrop-blur-xl !border !border-zinc-800/50 !text-zinc-200 !rounded-2xl !shadow-2xl !p-4 !min-h-[80px]",
            },
        );
    };

    const errorToast = (message: string, description?: string) => {
        toast.error(
            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20">
                        <IconX className="h-6 w-6 text-red-400" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-white">{message}</span>
                        {description && (
                            <span className="mt-0.5 text-sm text-gray-400">{description}</span>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => toast.dismiss()}
                    className="flex-shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition-colors duration-200 hover:bg-gray-100"
                >
                    Corrigindo!
                </button>
            </div>,
            {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                icon: false,
                className:
                    "!bg-zinc-900/95 !backdrop-blur-xl !border !border-zinc-800/50 !text-zinc-200 !rounded-2xl !shadow-2xl !p-4 !min-h-[80px]",
            },
        );
    };

    const infoToast = (message: string, description?: string) => {
        toast.info(
            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20">
                        <svg
                            className="h-6 w-6 text-blue-400"
                            fill="none"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-white">{message}</span>
                        {description && (
                            <span className="mt-0.5 text-sm text-gray-400">{description}</span>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => toast.dismiss()}
                    className="flex-shrink-0 rounded-lg bg-zinc-800/60 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-700/60"
                >
                    OK
                </button>
            </div>,
            {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                icon: false,
                className:
                    "!bg-zinc-900/95 !backdrop-blur-xl !border !border-zinc-800/50 !text-zinc-200 !rounded-2xl !shadow-2xl !p-4 !min-h-[80px]"
            },
        );
    };

    const warningToast = (message: string, description?: string) => {
        toast.warning(
            <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500/20">
                        <svg
                            className="h-6 w-6 text-yellow-400"
                            fill="none"
                            strokeWidth={2.5}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-base font-semibold text-white">{message}</span>
                        {description && (
                            <span className="mt-0.5 text-sm text-gray-400">{description}</span>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => toast.dismiss()}
                    className="flex-shrink-0 rounded-lg bg-zinc-800/60 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-700/60"
                >
                    Entendi!
                </button>
            </div>,
            {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeButton: false,
                pauseOnHover: true,
                icon: false,
                className:
                    "!bg-zinc-900/95 !backdrop-blur-xl !border !border-zinc-800/50 !text-zinc-200 !rounded-2xl !shadow-2xl !p-4 !min-h-[80px]",
 
            },
        );
    };

    return (
        <ToastContext.Provider value={{ successToast, errorToast, infoToast, warningToast }}>
            <ToastContainer
                limit={3}
                style={{
                    width: "auto",
                    maxWidth: "600px",
                }}
            />
            {children}
        </ToastContext.Provider>
    );
};
