import { useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

import algolia from "@assets/images/svg/algolia-logo.svg";

type SearchOverlayProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
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
                    className="fixed top-0 left-0 z-50 flex h-full w-full justify-center bg-black/50 px-3 py-10 backdrop-blur-xl"
                >
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="bg-body-background h-fit w-full max-w-xl rounded-xl"
                    >
                        <div className="flex items-center px-5">
                            <IconSearch width={15} className="text-title" />
                            <input
                                type="text"
                                placeholder="Pesquisar por denúncias, comunidade, etc..."
                                className="flex-1 border-0 px-2 py-5 text-sm outline-0"
                            />
                            <button
                                onClick={onClose}
                                className="h-fit rounded-sm bg-gradient-to-br from-stone-100 to-stone-300/50 to-125% p-1 px-3 text-sm shadow-[0px_3px_0px_0px_rgba(0,_0,_0,_0.3)] inset-ring-1 inset-ring-zinc-300 focus:translate-y-[3px] focus:shadow-[0px_1px_0px_0px_rgba(0,_0,_0,_0.3)]"
                            >
                                esc
                            </button>
                        </div>
                        <div className="flex h-40 items-center justify-center border-y-1 border-zinc-200 p-5">
                            <p className="text-subtitle">Nada encontrado ;(</p>
                        </div>
                        <div className="flex items-center justify-end p-5">
                            <a
                                href="https://www.algolia.com/"
                                target="_blank"
                                className="text-title flex items-center justify-center gap-[0.35rem] text-sm font-medium"
                            >
                                Searched by{" "}
                                <img
                                    src={algolia}
                                    alt="Angolia"
                                    className="fill-title"
                                    width={80}
                                />
                            </a>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
