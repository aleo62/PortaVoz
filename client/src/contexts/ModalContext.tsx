import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, createContext, useContext, useState } from "react";

type ModalContextType = {
    closeModal: () => void;
    openModal: (content: ReactNode) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [content, setContent] = useState<ReactNode>();
    const [modalOpen, setModalOpen] = useState<ReactNode>();

    const openModal = (content: ReactNode) => {
        setContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-0 left-0 z-[250] flex h-full w-full justify-center gap-2 bg-black/10 backdrop-blur-sm lg:px-3 lg:py-5 "
                    >
                        {content}
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
