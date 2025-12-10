import { ModalProvider } from "@/contexts/ModalProvider";
import { ToastProvider } from "@/contexts/ToastProvider";
import { SocketProvider } from "@/contexts/SocketContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
                <ToastProvider>
                    <ModalProvider>{children}</ModalProvider>
                </ToastProvider>
            </SocketProvider>
        </QueryClientProvider>
    );
};
