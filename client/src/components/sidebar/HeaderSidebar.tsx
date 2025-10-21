import { useIsMobile } from "@/hooks/useIsMobile";
import { ReactNode } from "react";
import { LinkBack } from "../ui/LinkBack";
import { HeaderOptions } from "./HeaderOptions";

export const HeaderSidebar = ({
    children,
    linkBack,
}: {
    children?: ReactNode;
    linkBack?: boolean;
}) => {
    const isMobile = useIsMobile();

    return (
        <header className="sticky top-0 z-100 mx-auto mb-3 flex h-full max-h-20 w-full items-center gap-6 bg-transparent bg-gradient-to-b from-[rgba(0,0,0,0.15)] to-transparent py-5 lg:gap-3 lg:px-10">
            <div className="mx-auto flex w-full max-w-7xl items-center">
                {linkBack && <LinkBack />}
                {children}
                {!isMobile && <HeaderOptions />}
            </div>
        </header>
    );
};
