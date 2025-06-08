import { HeaderSidebar } from "@/components/HeaderSidebar";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { useIsMobile } from "../isMobile";
export const SidebarLayout = ({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} className="flex-shrink-0" />

            <div className="relative flex h-full flex-1 flex-col overflow-hidden">
                <HeaderSidebar
                    title={title}
                    isMobile={isMobile}
                    onClick={() => setIsOpen(!isOpen)}
                />

                <div className="flex-1 overflow-y-auto p-3">
                    <div className="flex lg:flex-row justify-center gap-3 flex-col">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
