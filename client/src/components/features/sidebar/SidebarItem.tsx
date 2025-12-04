import { useStoreSidebar } from "@/stores/sidebarStore";
import { useStoreUser } from "@/stores/userStore";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";

type SidebarItemProps = {
    label: string;
    Icon: React.ElementType;
    active?: boolean;
    href?: string;
    modalKey?: string;
    openModal?: (modalKey: string, props?: Record<string, any>) => void;
    notification?: "inbox" | "chat";
};

export const SidebarItem = ({
    label,
    Icon,
    active,
    href,
    modalKey,
    openModal,
    notification,
}: SidebarItemProps) => {
    const navigate = useNavigate();
    const { isOpen } = useStoreSidebar();
    const { user } = useStoreUser();

    let notificationCount = 0;
    if (notification === "inbox") {
        notificationCount = user?.meta?.counters?.unreadNotifications || 0;
    } else if (notification === "chat") {
        notificationCount = user?.meta?.counters?.unreadChatMessages || 0;
    }

    return (
        <button
            onClick={() => (href ? navigate(href!) : openModal!(modalKey as any, {}))}
            className={`relative flex w-full items-center p-[.7rem] ${active ? "text-title bg-zinc-200/50 shadow-[0px_2px_10px_-10px_rgba(0,_0,_0,_0.1)] ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-800" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 hover:dark:bg-zinc-800/50 hover:dark:text-zinc-200"} rounded-lg transition-all`}
        >
            <Icon className={`size-5.5 stroke-[1.9px]`} />
            <span
                className={`${isOpen ? "w-45 pl-3" : "w-0"} overflow-hidden text-start text-[.95rem] whitespace-nowrap transition-[width,padding]`}
            >
                {label}
            </span>
            <AnimatePresence>
                {notificationCount > 0 && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        className={`absolute flex items-center justify-center rounded-full bg-red-600 font-medium text-white transition-all ${
                            isOpen
                                ? "top-1/2 right-2 h-5 min-w-5 -translate-y-1/2 px-1 text-xs"
                                : "top-1 right-1 h-2 w-2 p-0"
                        }`}
                    >
                        {isOpen && (notificationCount > 9 ? "+9" : notificationCount)}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};
