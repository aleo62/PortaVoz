import { ModalDefaultProps } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { useNotifications } from "@/hooks/user/useNotification";
import { NotificationData } from "@/types/notificationDataType";
import { motion } from "framer-motion";
import { NotificationItem } from "./NotificationItem";

export const NotificationModal = ({ zIndex }: ModalDefaultProps) => {
    const { data, isLoading } = useNotifications();
    const notifications: NotificationData[] =
        data?.pages.flatMap((page) => page.notifications as NotificationData[]) || [];

    return (
        <motion.div
            initial={{ translateX: 50, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-auto grid h-full w-full max-w-lg grid-rows-[auto_1fr_auto] bg-white shadow-[0px_0px_35px_-19px_rgba(0,_0,_0,_0.1)] lg:mr-5 lg:rounded-2xl dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <header className="border-b-1 border-zinc-200/60 p-5 px-5 pt-6 dark:border-zinc-800/60">
                <div className="flex items-center justify-between">
                    <h2 className="text-title text-2xl font-medium">Notificações</h2>
                    <ModalProvider.Close />
                </div>
            </header>
            {isLoading && "Carregando..."}
            <main className="scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent flex-1 space-y-2 overflow-y-auto px-5 py-2">
                {notifications.map((notification) => (
                    <NotificationItem key={notification._id} notification={notification} />
                ))}
            </main>
        </motion.div>
    );
};
