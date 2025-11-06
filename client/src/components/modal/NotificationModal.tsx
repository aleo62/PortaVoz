import { useNotifications } from "@/hooks/user/useNotification";
import { NotificationData } from "@/utils/types/notificationDataType";
import { IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Notification } from "../ui/Notification";

export const NotificationModal = ({ onClose }: { onClose: () => void }) => {
    const { data, isLoading } = useNotifications();
    const notifications: NotificationData[] =
        data?.pages.flatMap((page) => page.notifications as NotificationData[]) || [];

    return (
        <motion.div
            initial={{ translateX: 50, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-body-background ml-auto h-full w-full max-w-lg lg:rounded-2xl"
        >
            <header className="mb-5 px-5 pt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-title text-xl font-medium lg:text-2xl">Notificações</h2>
                    <span
                        className="cursor-pointer rounded-full bg-zinc-200 p-2 dark:bg-zinc-800"
                        onClick={onClose}
                    >
                        <IconX className="text-subtitle size-4" />
                    </span>
                </div>
                <nav className="mt-4 flex items-center gap-2">
                    <li className="text-title list-none rounded-xl bg-zinc-200 p-2 px-5 text-sm dark:bg-zinc-700">
                        Todos
                    </li>
                    <li className="text-title list-none rounded-xl p-1 px-5 text-sm">Todos</li>
                    <li className="text-title list-none rounded-xl p-2 px-5 text-sm">Todos</li>
                    <li className="text-title list-none rounded-xl p-2 px-5 text-sm">Todos</li>
                </nav>
            </header>
            {isLoading && "Carregando..."}
            <main className="scrollbar-thin dark:scrollbar-thumb-zinc-700 scrollbar-thumb-zinc-400 scrollbar-track-transparent h-full overflow-y-auto px-2 py-2">
                {notifications.map((notification) => (
                    <Notification key={notification._id} notification={notification} />
                ))}
            </main>
        </motion.div>
    );
};
