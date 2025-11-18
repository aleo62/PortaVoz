import { Sidebar } from "@components/features/sidebar/Sidebar";
import { SidebarHeader } from "@components/features/sidebar/SidebarHeader";
import { useEffect } from "react";
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
    const location = useLocation();

    useEffect(() => {
        const section = document.querySelector("section.scrollable-layout");
        if (section) section.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <div className="relative flex lg:h-screen">
            <Sidebar />

            <section className="flex flex-1 flex-col">
                <SidebarHeader linkBack={linkBack} noHeader={noHeader} />

                <div
                    className={`scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent flex flex-1 overflow-y-auto ${
                        orientation === "col" ? "flex-col pb-6" : "flex-row"
                    } max-lg:px-1`}
                >
                    {children}
                </div>
            </section>
        </div>
    );
};
