import { api } from "@/api";
import { Button } from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import { useToast } from "@/contexts/ToastContext";
import { useStoreUser } from "@/stores/userStore";
import { IconLogout, IconTrash } from "@tabler/icons-react";
import { getAuth, signOut } from "firebase/auth";
import { SettingsBlock } from "../components/SettingsBlock";

export const DangerSettings = () => {
    const { user } = useStoreUser();
    const { openModal } = useModal();
    const { successToast, errorToast } = useToast();
    const auth = getAuth();

    const handleLogoutAll = async () => {
        if (!user) return;
        try {
            await api.post(`/users/${user._id}/revoke-sessions`);
            successToast("Desconectado de todas as sessões.");
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            console.error(error);
            errorToast("Erro ao desconectar das sessões.");
        }
    };

    const handleDeleteAccount = () => {
        openModal("deleteAccount", {
            onConfirm: async () => {
                if (!user) return;
                try {
                    await api.delete(`/users/${user._id}`);
                    successToast("Conta deletada com sucesso.");
                    await signOut(auth);
                    window.location.reload();
                } catch (error) {
                    console.error(error);
                    errorToast("Erro ao deletar conta.");
                }
            },
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <SettingsBlock
                title="Sair de todos os dispositivos"
                description="Você será desconectado de todas as sessões ativas."
            >
                <Button
                    text="Sair de tudo"
                    styleType="outlined"
                    Icon={IconLogout}
                    className="ml-auto"
                    onClick={handleLogoutAll}
                />
            </SettingsBlock>

            <SettingsBlock
                title="Deletar conta"
                description="Ação irreversível. Todos os seus dados serão perdidos permanentemente."
                className="ring-red-200 dark:ring-red-900/50"
                titleClassName="text-red-600 dark:text-red-400"
            >
                <Button
                    text="Deletar conta"
                    className="ml-auto !bg-red-100 !text-red-600 !ring-red-200 hover:!bg-red-200 dark:!bg-red-900/20 dark:!text-red-400 dark:!ring-red-900/50 dark:hover:!bg-red-900/40"
                    Icon={IconTrash}
                    onClick={handleDeleteAccount}
                />
            </SettingsBlock>
        </div>
    );
};
