import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

type SaveConfirmationBarProps = {
    onSave: () => void;
    onCancel: () => void;
    isPending: boolean;
};

export const SaveConfirmationBar = ({ onSave, onCancel, isPending }: SaveConfirmationBarProps) => {
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-xl bg-zinc-900 p-3 px-6 text-white shadow-2xl dark:bg-zinc-800"
        >
            <span className="text-sm font-medium">Você tem alterações não salvas</span>
            <div className="flex items-center gap-2">
                <button
                    onClick={onCancel}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                    disabled={isPending}
                >
                    Descartar
                </button>
                <Button
                    text={isPending ? "Salvando..." : "Salvar"}
                    onClick={onSave}
                    disabled={isPending}
                    className="!h-8 !px-4 !text-sm"
                />
            </div>
        </motion.div>
    );
};
