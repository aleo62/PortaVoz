import { Sidebar } from "@components/features/sidebar/Sidebar";
import { SidebarHeader } from "@components/features/sidebar/SidebarHeader";
import { useEffect, useRef } from "react";
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
    const location = useLocation();

    useEffect(() => {
        const section = document.querySelector("section.scrollable-layout");
        if (section) section.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <div className="relative flex lg:h-screen">
            <Sidebar />

            <section
                ref={containerRef}
                className={`scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent flex min-h-screen flex-1 ${
                    orientation === "col" ? "flex-col pb-6" : "flex-row"
                } overflow-y-auto max-lg:h-screen max-lg:px-1`}
            >
                <SidebarHeader linkBack={linkBack} noHeader={noHeader} />
                {children}
            </section>
        </div>
    );
};
