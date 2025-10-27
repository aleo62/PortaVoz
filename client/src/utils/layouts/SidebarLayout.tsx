import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const SidebarLayout = ({
    children,
    noHeader,
    linkBack = false,
}: {
    children: React.ReactNode;
    noHeader?: boolean;
    linkBack?: boolean;
}) => {
    const containerRef = useRef<HTMLElement | null>(null);

    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const section = document.querySelector("section.scrollable-layout");
        if (section) section.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <div className="relative flex overflow-hidden lg:h-screen">
            <Sidebar isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="flex-shrink-0" />

            <section
                ref={containerRef}
                className="scrollbar-thumb-zinc-500 scrollbar-corner-zinc-950 scrollbar-thin scrollable-layout flex min-h-full flex-1 flex-col overflow-y-auto pb-6 max-lg:h-screen max-lg:px-1"
            >
                <HeaderSidebar
                    linkBack={linkBack}
                    noHeader={noHeader}
                    isOpen={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                />
                {children}
            </section>
        </div>
    );
};
