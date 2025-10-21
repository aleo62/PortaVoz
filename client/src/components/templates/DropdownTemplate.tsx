import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

export type DropdownTemplateProps = {
    isOpen: boolean;
    orientation: "top" | "bottom";
    onClose: () => void;
    children?: ReactNode;
};

export const DropdownTemplate = ({
    isOpen,
    orientation,
    onClose,
    children,
}: DropdownTemplateProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    onClose();
                }
            };
            document.addEventListener("mousedown", handleClickOutside);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={containerRef}
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: orientation === "top" ? -20 : 20,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: orientation === "top" ? -20 : 20,
                    }}
                    transition={{ duration: 0.15 }}
                    className={`text-subtitle absolute z-100 bg-white dark:bg-zinc-900 ${orientation === "bottom" ? "bottom-full mb-2" : "top-full mt-2"} right-0 grid w-fit gap-2 rounded-xl p-1 font-normal ring-1 ring-zinc-200 dark:ring-zinc-700`}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
