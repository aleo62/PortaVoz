import { useIsMobile } from "@/utils/isMobile";
import { ReactNode } from "react";
import { HeaderOptions } from "./HeaderOptions";
import { LinkBack } from "../ui/LinkBack";

export const HeaderSidebar = ({ children, linkBack }: { children?: ReactNode, linkBack?: boolean }) => {
    const isMobile = useIsMobile();

    return (
        <header className="mx-auto mb-3 flex h-full max-h-20 w-full max-w-6xl items-center gap-6 bg-transparent lg:gap-3">
            {linkBack && <LinkBack/> }
            {children}
            {!isMobile && <HeaderOptions />}
        </header>
    );
};
