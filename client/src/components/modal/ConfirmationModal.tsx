import { Button } from "@/components/ui/Button";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { motion } from "framer-motion";
import { useState } from "react";

type ConfirmationModalProps = ModalDefaultProps & {
    onConfirm: () => Promise<void> | void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
};

export const ConfirmationModal = ({
    zIndex,
    onConfirm,
    title,
    description,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
}: ConfirmationModalProps) => {
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
                    <h3 className="font-title text-xl lg:text-2xl">{title}</h3>
                </div>

                <ModalProvider.Close />
            </header>
            <main className="flex flex-col gap-4 p-5">
                <p className="text-subtitle">{description}</p>

                <div className="flex justify-end gap-2">
                    <Button
                        text={cancelText}
                        styleType="outlined"
                        onClick={closeModal}
                        disabled={isLoading}
                    />
                    <Button
                        text={confirmText}
                        onClick={handleConfirm}
                        isLoading={isLoading}
                    />
                </div>
            </main>
        </motion.div>
    );
};
