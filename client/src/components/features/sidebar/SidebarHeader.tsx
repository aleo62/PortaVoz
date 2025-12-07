import { useIsMobile } from "@/hooks/useIsMobile";
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
            <header className={`w-full overflow-hidden bg-transparent transition border-b-1 border-zinc-200 dark:border-zinc-800`}>
                <nav className="text-title mx-auto flex max-h-20 w-full items-center gap-3 px-1 py-2 lg:max-h-20 lg:px-8 lg:py-3">
                    <ToggleSidebar />
                    {!!linkBack && !useIsMobile() && <LinkBack href={linkBack} />}
                    <div className="">
                        <h3 className="font-title flex items-center gap-2 text-2xl tracking-wide">
                            {title || "PortaVoz"}
                        </h3>
                        <span className="text-subtitle flex items-center gap-2 text-xs max-lg:hidden">
                            Veja os posts do PortaVoz
                        </span>
                    </div>

                    <HeaderOptions openModal={openModal} />
                </nav>
            </header>
        )
    );
};
