import { act, useState } from "react";

type SidebarItemProps = {
    label: string;
    Icon: React.ElementType;
    active: boolean;
    href: string;
    isOpen?: boolean;
    isMobile?: boolean;
};

export const SidebarItem = ({ label, Icon, active, href, isOpen, isMobile }: SidebarItemProps) => {
    const [isOver, setIsOver] = useState(false);

    return (
        <a
            href={href}
            className={`transition-[color, background-color] before:text-accent before:bg-secondary/30 before:transition-[transform, opacity] relative flex items-centerrounded-lg p-[.9rem] px-4 rounded-xl font-medium duration-200 before:absolute before:z-50 before:overflow-hidden before:rounded-sm before:p-2 before:px-3 before:text-sm before:font-semibold before:text-ellipsis before:whitespace-nowrap before:backdrop-blur-lg before:duration-300 before:content-[attr(data-label)] ${active ? "bg-secondary text-primary font-medium" : "hover:text-title text-zinc-600 hover:bg-stone-100"} ${isOver ? "before:left-[70px] before:opacity-100" : "before:left-[-50px] before:opacity-0"} ${!isOpen && isMobile ? "cursor-default" : "cursor-pointer"}`}
            data-label={label}
            onMouseOver={() => !isOpen && !isMobile && setIsOver(true)}
            onMouseLeave={() => !isOpen && !isMobile && setIsOver(false)}
        >
            {<Icon className={`size-6 ${active ? "stroke-primary" : "stroke-[1.7]"}`} />}
            <span
                className={`text-md origin-left overflow-hidden transition-all duration-300 ${isOpen ? "ml-3 w-38 opacity-100" : "ml-0 w-0 opacity-0"}`}
            >
                {label}
            </span>
        </a>
    );
};
