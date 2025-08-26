import { useNotifications } from "@/hooks/user/useNotification";
import { NotificationData } from "@/utils/types/notificationDataType";
import { DropdownTemplate, DropdownTemplateProps } from "../templates/DropdownTemplate";
import { useNavigate } from "react-router-dom";

export const NotificationDrop = ({ isOpen, orientation, onClose }: DropdownTemplateProps) => {
    const navigate = useNavigate();
    const { data } = useNotifications();
    let notifications: NotificationData[] =
        data?.pages.flatMap((page) => page.notifications as NotificationData[]) || [];

    return (
        <DropdownTemplate isOpen={isOpen} orientation={orientation} onClose={onClose}>
            <nav className="w-80 max-h-200 divide-y-1 divide-zinc-100 p-1 dark:divide-zinc-700">
                {notifications.map((notification) => (
                    <div
                        key={notification._id}
                        className="grid grid-cols-[auto_1fr] items-start gap-2 cursor-pointer rounded-md px-2 py-2 hover:bg-zinc-100 hover:dark:bg-zinc-800"
                        onClick={() => navigate(notification.href)}
                    >
                        <header>
                            <img
                                src={notification.senderPhoto}
                                alt=""
                                className="h-9 w-9 rounded-full"
                            />
                        </header>

                        <main className="min-w-0">
                            <h3 className="text-title truncate text-sm font-medium">
                                {notification.title}
                            </h3>
                            <p className="text-xs">{notification.content}</p>
                        </main>
                    </div>
                ))}
            </nav>
        </DropdownTemplate>
    );
};
