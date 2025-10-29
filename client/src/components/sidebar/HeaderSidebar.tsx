import { useIsMobile } from "@/hooks/useIsMobile";
import { IconChevronLeftPipe, IconChevronRightPipe } from "@tabler/icons-react";
import { ReactNode, useEffect } from "react";
import { LinkBack } from "../ui/LinkBack";
import { HeaderOptions } from "./HeaderOptions";

export const HeaderSidebar = ({
    linkBack,
    noHeader,
    isOpen,
    onClick,
}: {
    children?: ReactNode;
    linkBack?: boolean;
    noHeader?: boolean;
    isOpen?: boolean;
    onClick?: () => void;
}) => {
    const isMobile = useIsMobile();

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", () => console.log(window.pageYOffset > 50));
        }
    }, []);

    const IconBar = isOpen ? IconChevronLeftPipe : IconChevronRightPipe;

    return (
        !noHeader && (
            <header
                className={`bg-body-background sticky top-0 z-100 mx-auto mb-3 flex h-full max-h-20 w-full items-center gap-6  py-5 lg:gap-3 lg:px-10`}
            >
                <div className="mx-auto flex w-full max-w-7xl items-center">
                    {isMobile && !linkBack && (
                        <button
                            className={`cursor-pointer rounded-lg bg-zinc-50 p-2 text-zinc-700 ring-1 ring-zinc-200 transition-[color] duration-300 hover:bg-zinc-100 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-white ${isOpen ? "mx-0" : "mx-auto"}`}
                            onClick={onClick}
                        >
                            <IconBar className="size-6.5" />
                        </button>
                    )}
                    {linkBack && <LinkBack />}

                    <HeaderOptions />
                </div>
            </header>
        )
    );
};
