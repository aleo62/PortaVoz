import { ModalDefaultProps } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { useNotifications } from "@/hooks/user/useNotification";
import { NotificationData } from "@/types/notificationDataType";
import { IconDotsVertical, IconInfinity } from "@tabler/icons-react";
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
            <header className="p-5 border-b-1 border-zinc-200/60 px-5 pt-6 dark:border-zinc-800/60">
                <div className="flex items-center justify-between">
                    <h2 className="text-title text-2xl font-medium">Notificações</h2>
                    <ModalProvider.Close />
                </div>
                <nav className="mt-4 flex items-center gap-2">
                    <li className="text-title flex list-none items-center gap-1 rounded-xl bg-zinc-100 p-1.5 px-4 text-sm font-medium dark:bg-zinc-800">
                        <IconInfinity className="stroke-[1.5]" />
                        Todos
                    </li>
                    <li className="text-title list-none rounded-xl p-2 px-5 text-sm">
                        Comentários
                    </li>
                    <li className="text-title list-none rounded-xl p-2 px-5 text-sm">Votes</li>

                    <IconDotsVertical className="text-title ml-auto size-4.5" />
                </nav>
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
