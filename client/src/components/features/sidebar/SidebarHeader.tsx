import { LinkBack } from "@components/ui/LinkBack";
import { ToggleSidebar } from "@components/ui/ToggleSidebar";
import { IconHome } from "@tabler/icons-react";
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
                className={`w-full overflow-hidden border-b-1 border-zinc-200 bg-white transition dark:border-zinc-800 dark:bg-zinc-900`}
            >
                <nav className="text-title mx-auto flex max-h-20 w-full items-center gap-6 px-1 py-2 lg:max-h-20 lg:gap-3 lg:px-10">
                    <ToggleSidebar />
                    {!!linkBack && <LinkBack href={linkBack} />}
                    <div className="flex items-center gap-5">
                        <h3 className="font-title flex items-center gap-2 text-2xl font-light tracking-wide">
                            {title || "PortaVoz"}
                        </h3>
                        <span className="text-subtitle flex items-center gap-2 text-sm">
                            <IconHome className="size-4" /> <span>{">"}</span> {title}
                        </span>
                    </div>

                    <HeaderOptions openModal={openModal} />
                </nav>
            </header>
        )
    );
};
