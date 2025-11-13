import { ToggleSidebar } from "@/components/ui/ToggleSidebar";
import { useStoreUser } from "@/stores/userStore";
import { LinkBack } from "@components/ui/LinkBack";
import { ReactNode, useEffect } from "react";
import { HeaderOptions } from "./SidebarHeaderOptions";

export const SidebarHeader = ({
    linkBack,
    noHeader,
}: {
    children?: ReactNode;
    linkBack?: string;
    noHeader?: boolean;
}) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => console.log(window.pageYOffset > 50));
        }
    }, []);

    const { user } = useStoreUser();

    return (
        !noHeader && (
            <header
                className={`sticky top-0 z-[100] border-b-1 border-zinc-200 bg-white transition dark:border-zinc-800 dark:bg-zinc-900`}
            >
                <nav className="text-title mx-auto flex max-h-20 w-full max-w-7xl items-center gap-6 px-1 py-3 lg:max-h-20 lg:gap-3 lg:px-10">
                    {!!linkBack && <LinkBack href={linkBack} />}
                    <h3 className="font-title flex items-center gap-2 text-lg font-light">
                        {" "}
                        Olá, tudo bem?{" "}
                        <figure className="relative h-9 w-9 overflow-hidden rounded-full">
                            <img className="absolute h-full w-full" src={user?.image} alt="" />
                        </figure>{" "}
                        {user?.username}
                    </h3>
                    <ToggleSidebar />
                    <HeaderOptions />
                </nav>
            </header>
        )
    );
};
