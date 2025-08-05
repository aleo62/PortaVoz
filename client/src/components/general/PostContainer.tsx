import { IconAlertTriangle, IconLink, IconPencilCog, IconTrash } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ClipLoader as DeleteLoader } from "react-spinners";

type PostContainerProps = {
    isContainerOpen: boolean;
    orientation: "top" | "bottom";
    onClose: () => void;
    toggleRef: React.RefObject<HTMLDivElement>;
    isOwner: boolean;
    onDeletePost: () => void;
};

export const PostContainer = ({
    isContainerOpen,
    orientation,
    onClose,
    toggleRef,
    isOwner,
    onDeletePost,
}: PostContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDeleting, setIsDeleting] = useState(false);

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
        <>
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
                            <ul className="flex w-46 flex-col py-1 text-sm">
                                <li>
                                    <a
                                        href="/profile"
                                        className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                                    >
                                        <IconLink className="size-4.5" /> Copiar Link
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/profile"
                                        className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                                    >
                                        <IconAlertTriangle className="size-4.5" /> Denunciar Post
                                    </a>
                                </li>
                            </ul>
                            {isOwner && (
                                <ul className="flex w-46 flex-col py-1 text-sm">
                                    <li>
                                        <a
                                            href="/profile"
                                            className="flex w-full items-center gap-2 rounded-lg p-3 px-4 hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 hover:dark:text-white"
                                        >
                                            <IconPencilCog className="size-4.5" />
                                            Editar Post
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="flex w-full items-center gap-2 rounded-lg p-3 px-4 text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            onClick={() => {
                                                onDeletePost();
                                                setIsDeleting(true);
                                            }}
                                        >
                                            <IconTrash className="size-4.5" /> Deletar Post{" "}
                                            <DeleteLoader
                                                className={`ml-auto ${isDeleting ? "opacity-100" : "opacity-0" }`}
                                                color="#ed1307"
                                                size={18}
                                                
                                            />
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
