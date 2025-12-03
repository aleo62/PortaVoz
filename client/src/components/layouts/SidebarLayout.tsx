import { useModal } from "@/contexts/ModalContext";
import { Sidebar } from "@components/features/sidebar/Sidebar";
import { SidebarHeader } from "../features/sidebar/SidebarHeader";

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
        <div className="relative flex h-screen overflow-hidden lg:py-4">
            <Sidebar />

            <section className="flex w-full flex-1 flex-col overflow-hidden bg-white ring-1 ring-zinc-200 lg:mr-3 lg:rounded-xl dark:bg-zinc-900 dark:ring-zinc-800">
                <SidebarHeader
                    linkBack={linkBack}
                    noHeader={noHeader}
                    title={title}
                    openModal={openModal as any}
                />

                <div
                    className={`scrollbar-thin overflow-y-auto  dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent flex flex-1 ${
                        orientation === "col"
                            ? "flex-col pb-6"
                            : "max-lg:flex-col max-lg:min-h-screen lg:flex-row justify-center"
                    } h-full max-lg:px-1`}
                >
                    {children}
                </div>
            </section>
        </div>
    );
};
