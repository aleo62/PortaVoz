import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

export type OverlayTemplateProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
};

export const OverlayTemplate = ({ isOpen, children, onClose }: OverlayTemplateProps) => {
    useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.paddingRight = `${scrollBarWidth}px`;

            const header = document.querySelector("header") as HTMLElement;
            if (header) {
                header.style.paddingRight = `${scrollBarWidth}px`;
            }
        }
    }, [isOpen]);

    const resetScrollLock = () => {
        document.documentElement.style.overflow = "";
        document.documentElement.style.paddingRight = "";

        const header = document.querySelector("header") as HTMLElement;
        if (header) {
            header.style.paddingRight = "";
        }
    };
    return (
        <AnimatePresence onExitComplete={resetScrollLock}>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="fixed top-0 left-0 z-110 flex h-full w-full items-center justify-center gap-2 bg-black/50 pt-20 backdrop-blur-xl lg:px-3 lg:py-10"
                >
                    <IconX
                        onClick={onClose}
                        className="absolute top-3 right-3 cursor-pointer text-white"
                        style={{ zIndex: "100" }}
                    />
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
