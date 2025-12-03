import { Switch } from "@/components/ui/Switch";
import { useUpdateUserPreferences } from "@/hooks/user/useUpdateUserPreferences";
import { useUserPreferences } from "@/hooks/user/useUserPreferences";
import { useEffect, useState } from "react";
import { SettingsBlock } from "../components/SettingsBlock";

export const NotificationsSettings = () => {
    const [notifications, setNotifications] = useState({
        receiveVote: true,
        receiveFollow: true,
        receiveComment: true,
    });
    const { data: preferences, isLoading } = useUserPreferences("notifications");

    const updatePreferences = useUpdateUserPreferences();
    useEffect(() => {
        if (preferences) {
            setNotifications({
                receiveVote: preferences.receiveVote ?? true,
                receiveFollow: preferences.receiveFollow ?? true,
                receiveComment: preferences.receiveComment ?? true,
            });
        }
    }, [preferences]);

    const toggleNotification = (key: keyof typeof notifications) => {
        const newValue = !notifications[key];

        setNotifications((prev) => ({ ...prev, [key]: newValue }));
        updatePreferences.mutate({
            path: `notifications.${key}`,
            value: newValue,
        });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                <SettingsBlock title="Configurar Notificações   ">
                    <div className="mt-8 flex flex-col gap-6">
                        <p className="text-subtitle text-sm">Carregando...</p>
                    </div>
                </SettingsBlock>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <SettingsBlock title="Configurar Notificações   ">
                <div className="mt-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <span className="text-subtitle text-sm ">Votes</span>
                        <Switch
                            checked={notifications.receiveVote}
                            onChange={() => toggleNotification("receiveVote")}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-subtitle text-sm ">Seguidores</span>
                        <Switch
                            checked={notifications.receiveFollow}
                            onChange={() => toggleNotification("receiveFollow")}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-subtitle text-sm">Comentários</span>
                        <Switch
                            checked={notifications.receiveComment}
                            onChange={() => toggleNotification("receiveComment")}
                        />
                    </div>
                </div>
            </SettingsBlock>
        </div>
    );
};
