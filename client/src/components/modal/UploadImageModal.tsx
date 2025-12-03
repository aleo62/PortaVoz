import { Button } from "@/components/ui/Button";
import { DropdownFiles } from "@/components/ui/DropdownFiles";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { motion } from "framer-motion";

type UploadImageModalProps = ModalDefaultProps & {
    title: string;
    onUpload: (file: File) => void;
};

export const UploadImageModal = ({
    title,
    onUpload,
    zIndex,
}: UploadImageModalProps) => {
    const { closeModal } = useModal();

    const handleUpload = (file: File) => {
        onUpload(file);
        closeModal();
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
            <header className="border-b-1 border-zinc-200 px-3 py-6 lg:px-5 dark:border-zinc-800 flex items-center justify-between">
                <div>
                    <h3 className="font-title text-title text-xl lg:text-2xl">{title}</h3>
                    <p className="text-subtitle text-sm">Selecione uma imagem para enviar</p>
                </div>

                <ModalProvider.Close />
            </header>
            <main className="p-5">
                <DropdownFiles onUpload={handleUpload} />
            </main>
        </motion.div>
    );
};
