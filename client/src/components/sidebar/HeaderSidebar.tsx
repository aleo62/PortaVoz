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
        <header className="mx-auto mb-3 flex h-full max-h-20 w-full max-w-7xl items-center gap-6 bg-transparent py-5 lg:gap-3 lg:px-10">
            {linkBack && <LinkBack />}
            {children}
            {!isMobile && <HeaderOptions />}
        </header>
    );
};
