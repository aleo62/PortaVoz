import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type SidebarLayoutProps = {
    children: React.ReactNode;
    noHeader?: boolean;
    linkBack?: string;
    orientation: "row" | "col";
};

export const SidebarLayout = ({
    children,
    noHeader,
    linkBack,
    orientation = "col",
}: SidebarLayoutProps) => {
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
                className={`scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent flex h-32 min-h-full flex-1 ${orientation === "col" ? "flex-col pb-6" : "flex-row"} overflow-y-auto max-lg:h-screen max-lg:px-1`}
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
