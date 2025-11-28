import { Sidebar } from "@components/features/sidebar/Sidebar";
import { SidebarHeader } from "../features/sidebar/SidebarHeader";
import { useModal } from "@/contexts/ModalContext";

type SidebarLayoutProps = {
    children: React.ReactNode;
    noHeader?: boolean;
    linkBack?: string;
    orientation: "row" | "col";
    title?: string;
};

export const SidebarLayout = ({
    children,
    noHeader,
    linkBack,
    orientation = "col",
    title,
}: SidebarLayoutProps) => {
    const { openModal } = useModal();

    return (
        <div className="relative flex h-screen overflow-hidden">
            <Sidebar />

            <section className="flex w-full flex-1 flex-col overflow-hidden my-3 mr-2 rounded-xl ring-1 ring-zinc-200 dark:ring-zinc-800 bg-white dark:bg-zinc-900">
                <SidebarHeader linkBack={linkBack} noHeader={noHeader} title={title} openModal={openModal as any}/>

                <div
                    className={`scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent flex flex-1   ${
                        orientation === "col"
                            ? "flex-col overflow-y-auto pb-6"
                            : "flex-row justify-center"
                    } h-full max-lg:px-1`}
                >
                    {children}
                </div>
            </section>
        </div>
    );
};
