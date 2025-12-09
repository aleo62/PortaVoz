import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { useToast } from "@/contexts/ToastContext";
import {
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
} from "firebase/auth";
import { motion } from "framer-motion";
import { useState } from "react";

export const ChangePasswordModal = ({ zIndex }: ModalDefaultProps) => {
    const { closeModal } = useModal();
    const { successToast, errorToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (
            !passwordData.currentPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword
        ) {
            errorToast("Preencha todos os campos.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            errorToast("As senhas não coincidem!");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            errorToast("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setIsLoading(true);
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user || !user.email) {
            errorToast("Usuário não autenticado.");
            setIsLoading(false);
            return;
        }

        try {
            const credential = EmailAuthProvider.credential(
                user.email,
                passwordData.currentPassword,
            );
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, passwordData.newPassword);
            successToast("Senha alterada com sucesso!");
            closeModal();
        } catch (err) {
            const error = err as { code: string };
            console.error(error);
            if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
                errorToast("Senha atual incorreta.");
            } else if (error.code === "auth/weak-password") {
                errorToast("A nova senha é muito fraca.");
            } else if (error.code === "auth/requires-recent-login") {
                errorToast("Por favor, faça login novamente antes de alterar a senha.");
            } else {
                errorToast("Erro ao alterar senha. Tente novamente.");
            }
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
                    <h3 className="font-title text-title text-xl lg:text-2xl">Alterar Senha</h3>
                </div>
                <ModalProvider.Close />
            </header>

            <main className="flex flex-col gap-4 p-5">
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
                        styleType="outlined"
                        disabled={isLoading}
                    />
                    <Button text="Alterar senha" onClick={handleSubmit} isLoading={isLoading} />
                </div>
            </main>
        </motion.div>
    );
};
