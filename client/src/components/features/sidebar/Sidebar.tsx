import { portaVozLogo } from "@/data/data";
import { SidebarClientItems, SidebarItems } from "@/data/sidebar";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useTheme } from "@/hooks/useTheme";
import { useStoreSidebar } from "@/stores/sidebarStore";
import { useStoreUser } from "@/stores/userStore";
import { RiExpandUpDownLine } from "@remixicon/react";
import { IconChevronLeft, IconChevronRight, IconMoon, IconSun } from "@tabler/icons-react";
import { SidebarItem } from "./SidebarItem";

export const Sidebar = () => {
    const { isOpen, toggle } = useStoreSidebar();
    const { isDarkTheme, setIsDarkTheme } = useTheme();
    const isMobile = useIsMobile();
    const { user } = useStoreUser();

    const IconMenu = isOpen ? IconChevronLeft : IconChevronRight;

    return (
        <aside
            className={`fixed top-0 left-0 z-120 h-screen flex-shrink-0 border-r-1 border-r-zinc-200 transition-all duration-300 ease-in-out lg:relative dark:border-r-zinc-800 ${isMobile && !isOpen && "translate-x-[-120%]"}`}
        >
            <nav
                className={`relative grid h-full grid-rows-[1.5fr_6fr_2fr] justify-center border-zinc-200 bg-white px-4 py-2 shadow-[0px_4px_10px_-19px_rgba(0,_0,_0,_0.1)] duration-300 dark:border-zinc-700 dark:bg-zinc-900`}
            >
                <span
                    className="text-title absolute top-22 left-[100%] translate-x-[-50%] rounded-full bg-white p-2 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
                    onClick={toggle}
                >
                    <IconMenu className="size-4" />
                </span>

                <figure className="relative flex items-center px-1">
                    <img
                        src={portaVozLogo(isDarkTheme, true)}
                        alt=""
                        className="absolute max-w-9 rotate-15"
                    />
                </figure>

                <div className="space-y-2">
                    {SidebarItems.map((item) => (
                        <SidebarItem
                            Icon={item.icon}
                            IconSelected={item.iconSelected!}
                            label={item.label}
                            active={location.pathname.includes(item.href)}
                            href={item.href}
                        />
                    ))}
                </div>

                <div className="flex flex-col justify-center">
                    {SidebarClientItems.map((item) => (
                        <SidebarItem
                            Icon={item.icon}
                            IconSelected={item.iconSelected!}
                            label={item.label}
                            modal={<item.modal />}
                        />
                    ))}

                    <div
                        className="bg-body-background mx-auto mt-2 flex w-[100%] items-center gap-2 rounded-xl p-[4px] text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        onClick={() => !isOpen && setIsDarkTheme(!isDarkTheme)}
                    >
                        <div
                            className={`relative z-10 flex h-9 w-full before:transition-all before:duration-300 ${!isOpen && "before:w-full"} ${isDarkTheme && isOpen ? "before:left-0" : "before:right-0"} items-center ${isOpen ? "gap-2" : "gap-0"} before:absolute before:z-[-1] before:h-full before:w-1/2 before:rounded-[11px] before:bg-white before:shadow-sm before:content-[''] dark:before:bg-zinc-900`}
                        >
                            <button
                                className={`${!isDarkTheme && !isOpen ? "w-0" : "w-full"} ${isOpen && "w-full"} flex h-full items-center justify-center transition-[width] duration-300`}
                                onClick={() => setIsDarkTheme(true)}
                            >
                                <IconMoon className="size-4.5" />
                            </button>
                            <button
                                className={`${isDarkTheme && !isOpen ? "w-0" : "w-full"} ${isOpen && "w-full"} flex h-full items-center justify-center transition-[width] duration-300`}
                                onClick={() => setIsDarkTheme(false)}
                            >
                                <IconSun className="size-4.5" />
                            </button>
                        </div>
                    </div>

                    <div
                        className={`mt-2 flex items-center rounded-xl py-2 ${isOpen ? "px-2 ring-1 ring-zinc-200 dark:ring-zinc-800" : ""} w-full transition-all`}
                    >
                        <figure className="relative mx-auto h-11 w-11 overflow-hidden rounded-full">
                            <img
                                src={user?.image}
                                className="absolute ml-auto h-full w-full object-cover"
                                alt=""
                            />
                        </figure>

                        <div
                            className={`${isOpen ? "ml-2" : "ml-0"} flex-1 leading-4 transition-all`}
                        >
                            <h3
                                className={`text-title font-title truncate overflow-hidden transition-all ${isOpen ? "w-25" : "w-0"}`}
                            >
                                {user?.username}
                            </h3>
                            <p
                                className={`text- text-subtitle truncate overflow-hidden text-xs transition-all ${isOpen ? "w-30" : "w-0"}`}
                            >
                                {user?.email}
                            </p>
                        </div>
                        {isOpen && <RiExpandUpDownLine className="ml-auto size-4" />}
                    </div>
                </div>
            </nav>
        </aside>
    );
};
