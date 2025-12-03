import { portaVozLogo } from "@/constants/system";
import { useModal } from "@/contexts/ModalContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useStoreSidebar } from "@/stores/sidebarStore";
import { useThemeStore } from "@/stores/themeStore";
import { useStoreUser } from "@/stores/userStore";
import { SidebarAdminItems, SidebarClientItems, SidebarItems } from "@constants/sidebar";
import { IconChevronLeft, IconChevronRight, IconSelector } from "@tabler/icons-react";
import { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { SidebarUserDrop } from "./SidebarUserDrop";

export const Sidebar = () => {
    const { user } = useStoreUser();
    const { theme } = useThemeStore();
    const [isUserOpen, setIsUserOpen] = useState<boolean>(false);
    const { isOpen, toggle } = useStoreSidebar();
    const isMobile = useIsMobile();
    const { openModal } = useModal();

    const IconMenu = isOpen ? IconChevronLeft : IconChevronRight;

    return (
        <aside
            className={`max-lg:bg-body-background fixed top-0 left-0 z-[120] h-full flex-shrink-0 transition-all lg:relative ${isMobile && !isOpen && "translate-x-[-120%]"}`}
        >
            <nav
                className={`relative grid h-full grid-rows-[1.5fr_6fr_2fr] justify-center px-4 max-lg:py-4 shadow-[0px_4px_10px_-19px_rgba(0,_0,_0,_0.1)] duration-300`}
            >
                <button
                    className="text-title absolute top-22 left-[100%] z-[1000] translate-x-[-50%] rounded-full bg-white p-2 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
                    onClick={toggle}
                >
                    <IconMenu className="size-4" />
                </button>

                <figure className="relative flex items-center px-1">
                    <img
                        src={portaVozLogo(theme === "dark", true)}
                        alt=""
                        className="absolute max-w-8 rotate-15"
                    />
                </figure>

                <div className="space-y-2">
                    {SidebarItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            Icon={item.icon}
                            label={item.label}
                            active={location.pathname.includes(item.href)}
                            href={item.href}
                            openModal={openModal as any}
                        />
                    ))}
                </div>

                <div className="flex flex-col justify-end space-y-2">
                    {user?.claims!.admin &&
                        SidebarAdminItems.map((item, index) => (
                            <SidebarItem
                                key={index}
                                Icon={item.icon}
                                label={item.label}
                                active={location.pathname.includes(item.href)}
                                href={item.href}
                                openModal={openModal as any}
                            />
                        ))}

                    {SidebarClientItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            Icon={item.icon}
                            label={item.label}
                            modalKey={item.modalKey}
                            openModal={openModal as any}
                        />
                    ))}

                    <div
                        className={`mt-2 flex items-center rounded-xl py-2 ${isOpen && "bg-white px-2 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"} relative w-full transition-all`}
                    >
                        <SidebarUserDrop
                            isOpen={isUserOpen}
                            onClose={() => setIsUserOpen(false)}
                            orientation="bottom"
                        />
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
                                className={`text-subtitle truncate overflow-hidden text-xs transition-all ${isOpen ? "w-30" : "w-0"}`}
                            >
                                {user?.email}
                            </p>
                        </div>

                        {isOpen && (
                            <IconSelector
                                className="text-title ml-auto size-4.5"
                                onClick={() => setIsUserOpen((prev) => !prev)}
                            />
                        )}
                    </div>
                </div>
            </nav>
        </aside>
    );
};
