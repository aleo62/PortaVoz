import { IconPencil, IconUser } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type UserContainerProps = {
    isContainerOpen: boolean;
};

export const UserContainer = ({ isContainerOpen }: UserContainerProps) => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            {isContainerOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="bg-body-background text-subtitle absolute top-15 right-0 z-10 grid w-fit origin-top gap-2 rounded-lg p-4 font-normal inset-ring-2 inset-ring-zinc-300/20"
                >
                    <nav className="border-b border-zinc-200 pb-2">
                        <ul className="flex flex-col">
                            <li>
                                <a
                                    href=""
                                    className="text-md my-3 flex w-42 items-center gap-2 px-2"
                                >
                                    <IconUser className="size-5.5" /> Acessar Perfil
                                </a>
                            </li>
                            <li>
                                <a
                                    href=""
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
