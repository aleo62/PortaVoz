import { IconPencil, IconUser } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
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
                    className={`bg-body-background text-subtitle absolute dark:bg-zinc-900 ${orientation}-15 right-0 z-10 grid w-fit gap-2 rounded-lg p-4 font-normal inset-ring-2 inset-ring-zinc-300/20 dark:inset-ring-zinc-700`}
                >
                    <nav className="border-b border-zinc-200 pb-2 dark:border-zinc-700">
                        <ul className="flex flex-col">
                            <li>
                                <a
                                    href="/profile"
                                    className="text-md my-3 flex w-42 items-center gap-2 px-2"
                                >
                                    <IconUser className="size-5.5" /> Acessar Perfil
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/editprofile"
                                    className="text-md my-3 flex w-42 items-center gap-2 px-2"
                                >
                                    <IconPencil className="size-5.5" /> Editar Perfil
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="pt-2">
                        <button
                            onClick={() => navigate("/logout")}
                            className="text-sm text-red-600 hover:text-red-700"
                        >
                            Sair da conta
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
