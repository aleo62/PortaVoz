import { useStoreSidebar } from "@/stores/sidebarStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SidebarItemProps = {
    label: string;
    Icon: React.ElementType;
    IconSelected: React.ElementType;
    active: boolean;
    href: string;
};

export const SidebarItem = ({ label, Icon, active, href, IconSelected }: SidebarItemProps) => {
    const [isOver, setIsOver] = useState(false);
    const navigate = useNavigate();
    const { isOpen } = useStoreSidebar();

    return (
        <button
            onClick={() => navigate(href)}
            data-label={label}
            onMouseOver={() => !isOpen && setIsOver(true)}
            onMouseLeave={() => !isOpen && setIsOver(false)}
            className={`flex w-full items-center p-[.7rem] ${active ? "bg-secondary/50 text-accent" : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 hover:dark:bg-zinc-800 hover:dark:text-zinc-200"} rounded-lg transition-all`}
        >
            {active ? (
                <IconSelected className={`size-6 stroke-[.8]`} />
            ) : (
                <Icon className={`size-6 stroke-[.8]`} />
            )}
            <span
                className={`${isOpen ? "w-45 pl-3" : "w-0"} text-md overflow-hidden text-start transition-[width,padding]`}
            >
                {label}
            </span>
        </button>
    );
};
