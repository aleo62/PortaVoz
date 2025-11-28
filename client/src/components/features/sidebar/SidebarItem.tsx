import { useStoreSidebar } from "@/stores/sidebarStore";
import React from "react";
import { useNavigate } from "react-router-dom";

type SidebarItemProps = {
    label: string;
    Icon: React.ElementType;
    active?: boolean;
    href?: string;
    modalKey?: string;
    openModal?: (modalKey: string, props?: Record<string, any>) => void;
};

export const SidebarItem = ({
    label,
    Icon,
    active,
    href,
    modalKey,
    openModal,
}: SidebarItemProps) => {
    const navigate = useNavigate();
    const { isOpen } = useStoreSidebar();

    return (
        <button
            onClick={() => (href ? navigate(href!) : openModal!(modalKey as any, {}))}
            className={`flex w-full items-center p-[.7rem] ${active ? "text-title bg-white shadow-[0px_2px_10px_-10px_rgba(0,_0,_0,_0.1)] ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800" : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 hover:dark:bg-zinc-800 hover:dark:text-zinc-200"} rounded-lg transition-all`}
        >
            <Icon className={`size-5.5 stroke-[1.9px]`} />
            <span
                className={`${isOpen ? "w-45 pl-3" : "w-0"} overflow-hidden text-start text-[.95rem] transition-[width,padding]`}
            >
                {label}
            </span>
        </button>
    );
};
