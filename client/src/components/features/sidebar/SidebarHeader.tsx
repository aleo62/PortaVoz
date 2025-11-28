import { LinkBack } from "@components/ui/LinkBack";
import { ToggleSidebar } from "@components/ui/ToggleSidebar";
import { ReactNode } from "react";
import { HeaderOptions } from "./SidebarHeaderOptions";

export const SidebarHeader = ({
    linkBack,
    noHeader,
    title,
    openModal,
}: {
    children?: ReactNode;
    linkBack?: string;
    noHeader?: boolean;
    title?: string;
    openModal: (modalKey: string, props?: Record<string, any>) => void;
}) => {
    return (
        !noHeader && (
            <header
                className={`border-b-1 border-zinc-200 bg-white transition dark:border-zinc-800 dark:bg-zinc-900 w-full overflow-hidden `}
            >
                <nav className="text-title mx-auto flex max-h-20 w-full items-center gap-6 px-1 py-3 lg:max-h-20 lg:gap-3 lg:px-10">
                    <ToggleSidebar />

                    {!!linkBack && <LinkBack href={linkBack} />}
                    <h3 className="font-title flex items-center gap-2 text-2xl tracking-wide max-lg:hidden">
                        {title || "PortaVoz"}
                    </h3>

                    <HeaderOptions openModal={openModal} />
                </nav>
            </header>
        )
    );
};
