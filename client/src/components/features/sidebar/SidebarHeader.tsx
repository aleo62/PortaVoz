import { LinkBack } from "@components/ui/LinkBack";
import { ToggleSidebar } from "@components/ui/ToggleSidebar";
import { ReactNode, useEffect } from "react";
import { HeaderOptions } from "./SidebarHeaderOptions";

export const SidebarHeader = ({
    linkBack,
    noHeader,
    title,
}: {
    children?: ReactNode;
    linkBack?: string;
    noHeader?: boolean;
    title?: string;
}) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => console.log(window.pageYOffset > 50));
        }
    }, []);

    return (
        !noHeader && (
            <header
                className={`border-b-1 border-zinc-200 bg-white transition dark:border-zinc-800 dark:bg-zinc-900`}
            >
                <nav className="text-title mx-auto flex max-h-20 w-full max-w-7xl items-center gap-6 px-1 lg:px-3 py-3 lg:max-h-20 lg:gap-3">
                    <ToggleSidebar />

                    {!!linkBack && <LinkBack href={linkBack} />}
                    <h3 className="font-title flex items-center gap-2 text-3xl font-medium tracking-wider max-lg:hidden">
                        {title || "PortaVoz"}
                    </h3>

                    <HeaderOptions />
                </nav>
            </header>
        )
    );
};
