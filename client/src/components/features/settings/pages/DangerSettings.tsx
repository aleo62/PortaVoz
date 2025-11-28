import { Button } from "@/components/ui/Button";
import { IconLogout, IconTrash } from "@tabler/icons-react";
import { SettingsBlock } from "../components/SettingsBlock";

export const DangerSettings = () => {
    return (
        <div className="flex flex-col gap-4">
            <SettingsBlock
                title="Desativar conta"
                description="Sua conta ficará invisível até você fazer login novamente."
            >
                <Button text="Desativar" styleType="outlined" className="ml-auto" />
            </SettingsBlock>

            <SettingsBlock
                title="Sair de todos os dispositivos"
                description="Você será desconectado de todas as sessões ativas."
            >
                <Button
                    text="Sair de tudo"
                    styleType="outlined"
                    Icon={IconLogout}
                    className="ml-auto"
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
                />
            </SettingsBlock>
        </div>
    );
};
