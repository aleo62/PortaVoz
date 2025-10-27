import { portaVozLogo, SidebarItems, SidebarSpecialItems } from "@/data/data";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useTheme } from "@/hooks/useTheme";
import { useStoreUser } from "@/stores/userStore";
import {
    IconChevronLeftPipe,
    IconChevronRightPipe,
    IconMoon,
    IconSearch,
    IconSun,
} from "@tabler/icons-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchOverlay } from "../overlay/SearchOverlay";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({
    isOpen,
    onClick,
    className,
}: {
    isOpen: boolean;
    onClick: () => void;
    className: string;
}) => {
    const location = useLocation();
    const isMobile = useIsMobile();
    const { isDarkTheme, setIsDarkTheme } = useTheme();
    const { user } = useStoreUser();
    const [searchOpen, setSearchOpen] = useState(false);

    const IconBar = isOpen ? IconChevronLeftPipe : IconChevronRightPipe;

    return (
        <>
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <aside
                className={`fixed top-0 left-0 z-120 h-screen flex-shrink-0 transition-all duration-100 ease-in-out lg:relative ${isMobile && (!isOpen ? "pointer-events-none -translate-x-full" : "translate-x-0")} ${className}`}
            >
                <nav
                    className={`grid h-full grid-rows-[1.5fr_6fr_1fr] justify-center border-r-1 border-zinc-200 bg-white px-3.5 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] duration-100 dark:border-zinc-700 dark:bg-zinc-900 ${isMobile && !isOpen ? "pointer-events-none" : ""}`}
                >
                    {/* LOGO */}
                    <div className={`flex items-center justify-between px-2 pb-2.5`}>
                        <h1>
                            <a href="/" className="logo">
                                <img
                                    src={portaVozLogo(isDarkTheme)}
                                    className={`origin-top transition-[opacity,width] duration-300 ease-in-out ${isOpen ? "w-23 opacity-100" : "w-0 opacity-0"}`}
                                    alt="PortaVoz"
                                />
                            </a>
                        </h1>

                        <button
                            className={`cursor-pointer rounded-lg bg-zinc-50 p-2 text-zinc-700 ring-1 ring-zinc-200 transition-[color] duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white ${isOpen ? "mx-0" : "mx-auto"}`}
                            onClick={onClick}
                        >
                            <IconBar className="size-6.5" />
                        </button>
                    </div>

                    <ul className={`space-y-2 p-5 px-1 ${!isOpen ? "items-center" : ""}`}>
                        <div
                            onClick={() => setSearchOpen(true)}
                            className="text-title mb-6 flex items-center rounded-lg bg-zinc-100 px-4 py-2.5 ring-1 ring-zinc-200/70 dark:bg-zinc-800 dark:ring-zinc-700/70"
                        >
                            <IconSearch className="size-5.5" />
                            <span
                                className={`${isOpen ? "ml-3 w-38 opacity-100" : "ml-0 w-0 opacity-0"} text-sm text-zinc-400 transition-all dark:text-zinc-600`}
                            >
                                Pesquisar...
                            </span>
                        </div>

                        {SidebarItems.map(({ label, icon, href }, key) => (
                            <SidebarItem
                                key={key}
                                href={href}
                                Icon={icon}
                                label={label}
                                isOpen={isOpen}
                                active={location.pathname.includes(href)}
                                isMobile={isMobile}
                            />
                        ))}
                    </ul>

                    <ul className={`space-y-2 p-5 px-1 ${!isOpen ? "items-center" : ""}`}>
                        {user?.claims!.admin &&
                            SidebarSpecialItems.map(({ label, icon, href }, key) => (
                                <SidebarItem
                                    key={key}
                                    href={href}
                                    Icon={icon}
                                    label={label}
                                    isOpen={isOpen}
                                    active={location.pathname === href}
                                    isMobile={isMobile}
                                />
                            ))}
                        <div
                            className="mx-auto flex w-[95%] items-center gap-2 rounded-[15px] bg-zinc-200 p-[4px] text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                            onClick={() => !isOpen && setIsDarkTheme(!isDarkTheme)}
                        >
                            <div
                                className={`before:transition-left relative z-10 flex h-11 w-full before:duration-300 ${!isOpen && "before:w-full"} ${isDarkTheme ? "before:left-0" : "before:right-0"} items-center ${isOpen ? "gap-2" : "gap-0"} before:absolute before:z-[-1] before:h-full before:w-1/2 before:rounded-[11px] before:bg-white before:content-[''] dark:before:bg-zinc-900`}
                            >
                                <div
                                    className={`${!isDarkTheme && !isOpen ? "w-0" : "w-full"} ${isOpen && "w-full"} flex h-full items-center justify-center transition-[width] duration-300`}
                                    onClick={() => setIsDarkTheme(true)}
                                >
                                    <IconMoon className="size-5" />
                                </div>
                                <div
                                    className={`${isDarkTheme && !isOpen ? "w-0" : "w-full"} ${isOpen && "w-full"} flex h-full items-center justify-center transition-[width] duration-300`}
                                    onClick={() => setIsDarkTheme(false)}
                                >
                                    <IconSun className="size-5" />
                                </div>
                            </div>
                        </div>
                    </ul>
                </nav>
            </aside>
        </>
    );
};
