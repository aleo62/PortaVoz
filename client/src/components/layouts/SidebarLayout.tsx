import { useModal } from "@/contexts/ModalContext";
import { Sidebar } from "@components/features/sidebar/Sidebar";
import { SidebarHeader } from "../features/sidebar/SidebarHeader";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type SidebarLayoutProps = {
    children: React.ReactNode;
    noHeader?: boolean;
    linkBack?: string;
    title?: string;
    flex_col?: boolean;
};

export const SidebarLayout = ({
    children,
    noHeader,
    linkBack,
    title,
    flex_col = true,
}: SidebarLayoutProps) => {
    const { openModal } = useModal();
    const scrollRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [location.pathname]);

    return (
        <div className="relative flex max-lg:min-h-screen lg:h-screen overflow-hidden lg:py-3">
            <Sidebar />

            <section className="flex w-full flex-1 flex-col overflow-hidden bg-white ring-1 ring-zinc-200 lg:mr-3 lg:rounded-lg dark:bg-zinc-900 dark:ring-zinc-800">
                <SidebarHeader
                    linkBack={linkBack}
                    noHeader={noHeader}
                    title={title}
                    openModal={openModal as any}
                />

                <div
                    ref={scrollRef}
                    className={`scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent flex flex-1 min-h-0 overflow-y-auto ${flex_col ? "flex-col lg:pb-6 xxl:px-10" : "justify-center max-lg:flex-col max-lg:h-full"}`}
                >
                    {children}
                </div>
            </section>
        </div>
    );
};
