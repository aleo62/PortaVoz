import { NotificationData } from "@/utils/types/notificationDataType";
import { useNavigate } from "react-router-dom";

export const Notification = ({ notification }: { notification: NotificationData }) => {
    const navigate = useNavigate();
    console.log(notification.senderImage)

    return (
        <ul key={notification._id} className="" onClick={() => navigate(notification.href)}>
            <div className="grid cursor-pointer grid-cols-[auto_1fr] items-start gap-2 rounded-lg px-3 py-4 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                <header>
                    <img src={notification.senderImage} alt="" className="h-9 w-9 rounded-full" />
                </header>

                <main className="min-w-0">
                    <h3 className="text-title truncate text-sm font-medium">
                        {notification.title}
                    </h3>
                    <p className="text-xs">{notification.content}</p>
                </main>
            </div>
        </ul>
    );
};
