import { Button } from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import { SettingsBlock } from "../components/SettingsBlock";

export const PrivacitySettings = () => {
    const { openModal } = useModal();

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
        </div>
    );
};
