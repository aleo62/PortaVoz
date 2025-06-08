import { SidebarItems, SidebarOptions } from "@/utils/data";
import logo from "@assets/images/logo/logo-light.png";

import { useUser } from "@/contexts/UserContext";
import { useIsMobile } from "@/utils/isMobile";
import { IconChevronLeftPipe, IconChevronRightPipe } from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
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
    const IconBar = isOpen ? IconChevronLeftPipe : IconChevronRightPipe;
    const isMobile = useIsMobile();

    // USER DATAS
    const { userData } = useUser();

    return (
        <>
            <aside
                className={`fixed top-0 left-0 z-20 h-screen flex-shrink-0 transition-transform duration-300 ease-in-out lg:relative ${isMobile && (!isOpen ? "pointer-events-none -translate-x-full" : "translate-x-0")} ${className}`}
            >
                <nav
                    className={`grid h-full grid-rows-[1.5fr_7fr_2.5fr] justify-center border-r-1 border-zinc-200 bg-white px-3.5 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] duration-1000 ${isMobile && !isOpen ? "pointer-events-none" : ""}`}
                >
                    {/* LOGO */}
                    <div className={`flex items-center justify-between px-2 pb-2.5`}>
                        <h1>
                            <a href="/" className="logo">
                                <img
                                    src={logo}
                                    className={`transition-[opacity, width] origin-top duration-300 ease-in-out ${isOpen ? "w-23 opacity-100" : "w-0 opacity-0"}`}
                                    alt="PortaVoz"
                                />
                            </a>
                        </h1>

                        {
                            <button
                                className={`cursor-pointer rounded-lg bg-zinc-100 p-2 text-zinc-700 transition-[color] duration-300 hover:text-zinc-900 ${isOpen ? "mx-0" : "mx-auto"}`}
                                onClick={onClick}
                            >
                                <IconBar className="size-6.5" />
                            </button>
                        }
                    </div>

                    <ul className={`space-y-1 p-5 px-1 ${!isOpen ? "items-center" : ""}`}>
                        {SidebarItems.map(({ label, icon, href }, key) => (
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
                    </ul>

                    <div>
                        <ul className="space-y-1 px-1 py-3">
                            {SidebarOptions.map(({ label, icon, href }, key) => (
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
                        </ul>

                        <div className="flex items-center overflow-hidden border-t border-zinc-200 px-2 py-3">
                            <a href="/profile" className="">
                                <figure className="tansiton-[box-shadow, scale] mx-auto h-10 w-10 cursor-pointer overflow-clip rounded-xl shadow-md duration-300 hover:scale-103 hover:shadow-lg">
                                    <img src={userData?.image} width={100} alt="" />
                                </figure>
                            </a>

                            <div
                                className={`flex h-fit overflow-hidden transition-all ${isOpen ? "ml-3 w-38" : "ml-0 w-0"}`}
                            >
                                <div className="leading-4">
                                    <h4 className="text-title text-md font-semibold">Ale doe</h4>
                                    <span className="text-subtitle block max-w-[9.5rem] truncate text-[.8rem]">
                                        {userData?.email}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
};
