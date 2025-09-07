import { useNotifications } from "@/hooks/user/useNotification";
import { NotificationData } from "@/utils/types/notificationDataType";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";
import { Notification } from "../ui/Notification";

export const NotificationDrop = ({ isOpen, orientation, onClose }: DropdownTemplateProps) => {
    const { data, isLoading } = useNotifications();
    let notifications: NotificationData[] =
        data?.pages.flatMap((page) => page.notifications as NotificationData[]) || [];

    return (
        <DropdownTemplate isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <nav className="max-h-200 w-80 p-1 ">
                { isLoading && "Carregando..." }
                {notifications.map((notification) => (
                    <Notification notification={notification} />
                ))}
            </nav>
        </DropdownTemplate>
    );
};
