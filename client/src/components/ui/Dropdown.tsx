import { AnimatePresence, motion } from "framer-motion";
import { createContext, ElementType, ReactNode, useEffect, useRef } from "react";

export type DropdownProps = {
    isOpen: boolean;
    orientation: "top" | "bottom";
    onClose: () => void;
};
export type DropdownItemProps = {
    label: string;
    action: "report" | "deletePost" | "profile" | "settings" | "logout";
    Icon?: ElementType;
    alert?: boolean;
    onClick?: () => void;
};

export const DropdownContext = createContext(null);

export const Dropdown = ({
    children,
    isOpen,
    orientation,
    onClose,
}: { children: ReactNode } & DropdownProps) => {
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
        <DropdownContext.Provider value={null}>
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
                        className={`text-subtitle absolute z-100 bg-white dark:bg-zinc-900 ${orientation === "bottom" ? "bottom-full mb-2" : "top-full mt-2"} right-0 grid w-fit gap-2 rounded-xl font-normal ring-[.7px] ring-zinc-200 dark:ring-zinc-800`}
                    >
                        <nav className="divide-y-1 divide-zinc-200 py-2 dark:divide-zinc-800">
                            {children}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </DropdownContext.Provider>
    );
};

Dropdown.Block = function DropdownBlock({ children }: { children: ReactNode }) {
    return <ul className="flex w-45 flex-col p-1 text-sm">{children}</ul>;
};

Dropdown.Item = function DropdownItem({ label, Icon, alert, onClick }: DropdownItemProps) {
    return (
        <li>
            <a
                onClick={onClick}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-lg p-3 px-3 transition-all ${alert ? "text-red-600 hover:bg-red-200/50 hover:text-red-500 hover:dark:bg-red-700/5" : "hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800/50 hover:dark:text-white"}`}
            >
                {Icon && <Icon className="size-5" />} {label}
            </a>
        </li>
    );
};
