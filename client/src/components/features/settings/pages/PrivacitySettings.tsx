import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { useModal } from "@/contexts/ModalContext";
import { SettingsBlock } from "../components/SettingsBlock";

export const PrivacitySettings = () => {
    const { openModal } = useModal();
    const [emailData, setEmailData] = useState({
        newEmail: "",
        password: "",
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailData({ ...emailData, [e.target.name]: e.target.value });
    };

    const handleSubmitEmail = () => {
        // TODO: Implement email change logic
        toast.info("Funcionalidade de alterar email em desenvolvimento.");
    };

    return (
        <div className="space-y-6">
            <SettingsBlock
                title="Alterar Senha"
                description="Escolha uma senha forte para proteger sua conta."
            >
                <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Recomendamos usar uma senha forte e única.
                    </p>
                    <Button text="Alterar senha" onClick={() => openModal("changePassword", {})} />
                </div>
            </SettingsBlock>

            <SettingsBlock
                title="Alterar Email"
                description="Atualize o endereço de email associado à sua conta."
            >
                <div className="mt-4 space-y-4">
                    <FormInput
                        label="Novo email"
                        inputProps={{
                            type: "email",
                            name: "newEmail",
                            value: emailData.newEmail,
                            onChange: handleEmailChange,
                            placeholder: "seu.novo@email.com",
                        }}
                    />
                    <FormInput
                        label="Senha atual"
                        inputProps={{
                            type: "password",
                            name: "password",
                            value: emailData.password,
                            onChange: handleEmailChange,
                            placeholder: "Confirme sua senha",
                        }}
                    />
                    <div className="flex justify-end">
                        <Button text="Alterar email" onClick={handleSubmitEmail} />
                    </div>
                </div>
            </SettingsBlock>
        </div>
    );
};
