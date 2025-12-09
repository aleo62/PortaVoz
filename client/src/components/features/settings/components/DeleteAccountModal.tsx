import { Button } from "@/components/ui/Button";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { motion } from "framer-motion";
import { useState } from "react";

type DeleteAccountModalProps = ModalDefaultProps & {
    onConfirm: () => Promise<void>;
};

export const DeleteAccountModal = ({ zIndex, onConfirm }: DeleteAccountModalProps) => {
    const { closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm();
            closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit w-full max-w-[97%] rounded-2xl bg-white pb-4 lg:max-w-lg dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <header className="flex items-center justify-between border-b-1 border-zinc-200 px-3 py-6 lg:px-5 dark:border-zinc-800">
                <div>
                    <h3 className="font-title text-xl text-red-600 lg:text-2xl dark:text-red-400">
                        Deletar conta
                    </h3>
                </div>

                <ModalProvider.Close />
            </header>
            <main className="flex flex-col gap-4 p-5">
                <p className="text-subtitle">
                    Tem certeza que deseja deletar sua conta? Essa ação é irreversível e todos os
                    seus dados serão perdidos permanentemente.
                </p>

                <div className="flex justify-end gap-2">
                    <Button
                        text="Cancelar"
                        styleType="outlined"
                        onClick={closeModal}
                        disabled={isLoading}
                    />
                    <Button
                        text="Deletar permanentemente"
                        onClick={handleConfirm}
                        isLoading={isLoading}
                        className="!bg-red-100 !text-red-600 !ring-red-200 hover:!bg-red-200 dark:!bg-red-900/20 dark:!text-red-400 dark:!ring-red-900/50 dark:hover:!bg-red-900/40"
                    />
                </div>
            </main>
        </motion.div>
    );
};
