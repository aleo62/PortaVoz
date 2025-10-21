import { Sidebar } from "@/components/sidebar/Sidebar";
import { SidebarMobileHeader } from "@/components/sidebar/SidebarMobileHeader";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SidebarLayout = ({
    children,
    noHeader,
}: {
    children: React.ReactNode;
    noHeader?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const isMobile = useIsMobile();
    const location = useLocation();

    useEffect(() => {
        const section = document.querySelector("section.scrollable-layout");
        if (section) section.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <div className="relative flex overflow-hidden lg:h-screen">
            <Sidebar isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="flex-shrink-0" />

            <section className="scrollbar-thumb-zinc-500 scrollbar-corner-zinc-950 scrollbar-thin scrollable-layout flex min-h-full flex-1 flex-col overflow-y-auto max-lg:h-screen max-lg:px-1">
                {isMobile && !noHeader && <SidebarMobileHeader setIsOpen={setIsOpen} />}
                {children}
            </section>
        </div>
    );
};
