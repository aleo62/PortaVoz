import { Switch } from "@/components/ui/Switch";
import { useState } from "react";
import { SettingsBlock } from "../components/SettingsBlock";

export const NotificationsSettings = () => {
    const [notifications, setNotifications] = useState({
        posts: true,
        followers: true,
        comments: true,
    });

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col gap-4">
            <SettingsBlock title="Configurar Notificações   ">
                <div className="mt-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <span className="text-subtitle text-sm font-medium">Posts</span>
                        <Switch
                            checked={notifications.posts}
                            onChange={() => toggleNotification("posts")}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-subtitle text-sm font-medium">Seguidores</span>
                        <Switch
                            checked={notifications.followers}
                            onChange={() => toggleNotification("followers")}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-subtitle text-sm font-medium">Comentários</span>
                        <Switch
                            checked={notifications.comments}
                            onChange={() => toggleNotification("comments")}
                        />
                    </div>
                </div>
            </SettingsBlock>
        </div>
    );
};
