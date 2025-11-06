import { formatDate } from "@/utils/functions/formatDate";
import { NotificationData } from "@/utils/types/notificationDataType";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Notification = ({ notification }: { notification: NotificationData }) => {
    const navigate = useNavigate();
    const [Preview, setPreview] = useState<ReactElement | undefined>(undefined);

    useEffect(() => {
        switch (notification.type) {
            case "Vote":
                setPreview(<p>{formatDate(notification.createdAt)}</p>);
        }
    }, [notification]);

    return (
        <ul key={notification._id} className="" onClick={() => navigate(notification.href)}>
            <div className="grid cursor-pointer grid-cols-[auto_1fr] items-start justify-center gap-5 rounded-xl px-3 py-4 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                <header>
                    <img
                        src={notification.sender.image}
                        alt=""
                        className="h-12 w-12 rounded-full"
                    />
                </header>

                <main className="min-w-0">
                    <h3 className="text-title truncate text-md font-medium lg:text-lg">
                        {notification.message}
                    </h3>
                    <p className="text-subtitle text-xs">{Preview}</p>
                </main>
            </div>
        </ul>
    );
};
