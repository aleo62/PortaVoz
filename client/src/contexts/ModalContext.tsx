import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, createContext, useContext, useState } from "react";

type ModalContextType = {
    closeModal: () => void;
    openModal: (content: ReactNode, modalKey?: string) => void;
    modalOpen: boolean;
    modalKey: string;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalKey, setModalKey] = useState<string>("");

    const openModal = (content: ReactNode, modalKey?: string ) => {
        setContent(content);
        setModalOpen(true);
        setModalKey(modalKey!);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalKey("");
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, modalOpen, modalKey }}>
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 z-[250] flex h-full w-full justify-center gap-2 bg-gradient-to-b from-transparent dark:to-white/10  to-black/10  backdrop-blur-[1px] lg:px-3 lg:py-5"
                    >
                        {content}
                        <span
                            className="absolute top-0 left-0 z-[-1] h-full w-full"
                            onClick={() => closeModal()}
                        ></span>
                    </motion.div>
                )}
            </AnimatePresence>
            {children}
        </ModalContext.Provider>
    );
};


export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
