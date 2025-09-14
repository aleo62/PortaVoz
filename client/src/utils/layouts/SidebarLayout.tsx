import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarMobileHeader } from "@/components/sidebar/SidebarMobileHeader";
import { useState } from "react";
import { useIsMobile } from "../isMobile";
export const SidebarLayout = ({
    children,
    noHeader,
}: {
    children: React.ReactNode;
    noHeader?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const isMobile = useIsMobile();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="flex-shrink-0" />

            <div className="scrollbar-thumb-zinc-500 scrollbar-corner-zinc-950 scrollbar-thin overflow-y-auto flex h-full flex-1 flex-col p-3 px-2">
                {isMobile && !noHeader && <SidebarMobileHeader setIsOpen={setIsOpen} />}
                <div className="flex flex-col justify-center gap-3 lg:h-full lg:flex-row">
                    {children}
                </div>
            </div>
        </div>
    );
};
