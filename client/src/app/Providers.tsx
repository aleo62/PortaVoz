import { ToastProvider } from "@/contexts/ToastContext";
import { UserProvider } from "@/contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <UserProvider>{children}</UserProvider>
            </ToastProvider>
        </QueryClientProvider>
    );
};
