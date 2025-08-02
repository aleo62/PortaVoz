import { IconLogout, IconPencil, IconUser } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

type UserContainerProps = {
    isContainerOpen: boolean;
    orientation: "top" | "bottom";
    onClose: () => void;
    toggleRef: React.RefObject<HTMLDivElement>;
};

export const UserContainer = ({
    isContainerOpen,
    orientation,
    onClose,
    toggleRef,
}: UserContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                (containerRef.current && !containerRef.current.contains(event.target as Node)) ||
                (toggleRef.current && !toggleRef.current.contains(event.target as Node))
            ) {
                onClose();
            }
        };
        if (isContainerOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isContainerOpen, onClose]);

    return (
        <AnimatePresence>
            {isContainerOpen && (
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
                    className={`text-subtitle absolute bg-white dark:bg-zinc-900 ${orientation}-15 right-0 z-10 grid w-fit gap-2 rounded-lg p-1 font-normal ring-1 ring-zinc-200 dark:ring-zinc-700`}
                >
                    <nav className="divide-y-1 divide-zinc-100 dark:divide-zinc-700">
                        <ul className="flex w-42 flex-col py-1 text-sm">
                            <li>
                                <a
                                    href="/profile"
                                    className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                                >
                                    <IconUser className="size-4.5" /> Acessar Perfil
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/editprofile"
                                    className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                                >
                                    <IconPencil className="size-4.5" /> Editar Perfil
                                </a>
                            </li>
                        </ul>
                        <ul className="flex w-42 flex-col py-1 text-sm">
                            <li>
                                <a
                                    href="/logout"
                                    className="flex w-full items-center gap-2 rounded-lg p-3 px-4 text-red-700 hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
                                >
                                    <IconLogout className="size-4.5" />
                                    Sair
                                </a>
                            </li>
                        </ul>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
