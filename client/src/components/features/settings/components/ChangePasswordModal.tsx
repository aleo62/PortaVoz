import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ModalDefaultProps } from "@/contexts/ModalContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

export const ChangePasswordModal = ({ closeModal }: ModalDefaultProps) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("As senhas não coincidem!");
            return;
        }
        // TODO: Implement password change logic
        toast.info("Funcionalidade de alterar senha em desenvolvimento.");
        closeModal();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex w-full max-w-md flex-col gap-4 rounded-xl bg-white p-6 shadow-xl dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Alterar Senha</h2>
                <button
                    onClick={closeModal}
                    className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-4">
                <FormInput
                    label="Senha atual"
                    inputProps={{
                        type: "password",
                        name: "currentPassword",
                        value: passwordData.currentPassword,
                        onChange: handleChange,
                        placeholder: "Sua senha atual",
                    }}
                />
                <FormInput
                    label="Nova senha"
                    inputProps={{
                        type: "password",
                        name: "newPassword",
                        value: passwordData.newPassword,
                        onChange: handleChange,
                        placeholder: "Sua nova senha",
                    }}
                />
                <FormInput
                    label="Confirmar nova senha"
                    inputProps={{
                        type: "password",
                        name: "confirmPassword",
                        value: passwordData.confirmPassword,
                        onChange: handleChange,
                        placeholder: "Confirme sua nova senha",
                    }}
                />
            </div>

            <div className="flex justify-end gap-2">
                <Button
                    text="Cancelar"
                    onClick={closeModal}
                    className="bg-zinc-200 text-zinc-800 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
                />
                <Button text="Alterar senha" onClick={handleSubmit} />
            </div>
        </motion.div>
    );
};
