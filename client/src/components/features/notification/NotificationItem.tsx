import { useModal } from "@/contexts/ModalContext";
import { NotificationData } from "@/types/notificationDataType";
import { formatDate } from "@/utils/functions/formatDate";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotificationItem = ({ notification }: { notification: NotificationData }) => {
    const navigate = useNavigate();
    const [Preview, setPreview] = useState<ReactElement | undefined>(undefined);
    const { closeModal } = useModal();

    useEffect(() => {
        switch (notification.type) {
            case "Vote":
                setPreview(<p>{formatDate(notification.createdAt)}</p>);
                break;
            case "Comment":
                setPreview(
                    <p>
                        {formatDate(notification.createdAt)} &#x2022; "{notification.preview}"
                    </p>,
                );
                break;
            case "Follow":
                setPreview(<p>{formatDate(notification.createdAt)}</p>);
                break;
        }
    }, [notification]);

    return (
        <ul
            key={notification._id}
            className=""
            onClick={() => {
                closeModal();
                navigate(notification.href);
            }}
        >
            <div className="flex cursor-pointer items-center justify-center gap-3 rounded-xl px-3 py-4 hover:bg-zinc-100 hover:dark:bg-zinc-800">
                <header>
                    <img
                        src={notification.sender.image}
                        alt=""
                        className="h-12 w-12 rounded-full"
                    />
                </header>

                <main className="flex-1">
                    <h3 className="text-title text-md truncate">{notification.message}</h3>
                    <p className="text-subtitle text-xs">{Preview}</p>
                </main>
            </div>
        </ul>
    );
};
