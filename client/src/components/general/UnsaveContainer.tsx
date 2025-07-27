import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./Button";

type UnsaveProps = {
    onCancel: () => void;
    onSave: () => void;
};

export const UnsaveContainer = ({ onCancel, onSave }: UnsaveProps) => {
    return (
        <AnimatePresence>
            <motion.div
                whileInView={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-0 z-10 w-full p-2 opacity-0 max-md:top-0 md:bottom-0 md:p-3 md:px-5"
            >
                <div className="flex h-fit flex-col items-center justify-between rounded-2xl bg-white p-3 px-5 shadow-[0px_2px_80px_-11px_rgba(0,_0,_0,_0.1)] md:flex-row dark:bg-zinc-900">
                    <p className="mb-2 hidden text-sm font-medium text-zinc-700 md:block">
                        Deseja salvar as alterações?
                    </p>
                    <div className="flex items-center gap-2">
                        <Button text="Salvar" onClick={onSave} small />
                        <Button styleType="outlined" text="Cancelar" onClick={onCancel} small />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
