import { ModalProvider } from "@/contexts/ModalContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <ModalProvider>{children}</ModalProvider>
            </ToastProvider>
        </QueryClientProvider>
    );
};
