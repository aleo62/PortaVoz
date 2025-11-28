import { IconAlertCircle, IconLock, IconNotification, IconUser } from "@tabler/icons-react";
import { DangerSettings } from "@/components/features/settings/pages/DangerSettings";
import { NotificationsSettings } from "@/components/features/settings/pages/NotificationsSettings";
import { PrivacitySettings } from "@/components/features/settings/pages/PrivacitySettings";
import { ProfileSettings } from "@/components/features/settings/pages/ProfileSettings";
import { AppearenceSettings } from "@/components/features/settings/pages/AppearenceSettings";

export const SettingsItems = [
    { label: "Perfil", Icon: IconUser, key: "profile" },
    { label: "Privacidade", Icon: IconLock, key: "privacy" },
    { label: "Aparência", Icon: IconAlertCircle, key: "appearance" },
    { label: "Notificações", Icon: IconNotification, key: "notifications" },
    { label: "Área de Perigo", Icon: IconAlertCircle, key: "danger" },
];

export const SettingsPages = {
    profile: ProfileSettings,
    privacy: PrivacitySettings,
    appearance: AppearenceSettings,
    notifications: NotificationsSettings,
    danger: DangerSettings,
};
