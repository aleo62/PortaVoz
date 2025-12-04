import { useDeleteChat } from "@/hooks/chat/useDeleteChat";
import { useReadChatMessages } from "@/hooks/chat/useReadChatMessages";
import { useStoreUser } from "@/stores/userStore";
import { ChatData } from "@/types/chatDataType";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { ChatItemDrop } from "./ChatItemDrop";
import { formatDate } from "@/utils/functions/formatDate";

export const ChatItem = ({
    chat,
    joinChat,
}: {
    chat: ChatData;
    joinChat: (chatId: string) => void;
}) => {
    const deleteChat = useDeleteChat();
    const readMessages = useReadChatMessages();
    const { decrementUnreadChatMessages } = useStoreUser();
    const [openChatDrop, setOpenChatDrop] = useState(false);

    const handleDelete = () => {
        deleteChat.mutate(chat._id);
    };

    const handleRead = (join?: boolean) => {
        readMessages.mutateAsync(chat._id);
        decrementUnreadChatMessages(chat.unreadChatMessages);
        if (join) joinChat(chat._id);
    };

    if (!chat) return null;

    return (
        <div
            onClick={() => handleRead(true)}
            key={chat._id}
            className={`group group relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${openChatDrop ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
        >
            <ChatItemDrop
                isOpen={openChatDrop}
                chatId={chat._id}
                onClose={() => setOpenChatDrop(false)}
                onDeleteChat={handleDelete}
                onReadChat={handleRead}
                orientation="top"
            />

            <img
                src={chat.participants[0]?.image}
                alt=""
                className="h-11 w-11 rounded-full object-cover"
            />
            <div>
                <p className="text-md text-title font-medium">{chat.participants[0]?.username}</p>
                <p className="text-subtitle text-xs">{chat.recentMessage?.text}</p>
            </div>
            {chat.unreadChatMessages > 0 && (
                <span className="absolute top-3 right-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                    {chat.unreadChatMessages}
                </span>
            )}
            <div className="ml-auto flex flex-col items-end justify-center">
                <p className="text-subtitle text-xs">{formatDate(chat.recentMessage ? chat.recentMessage?.createdAt : chat.createdAt)}</p>
                <IconChevronDown
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenChatDrop(true);
                    }}
                    className={`text-title size-4.5 transition ${openChatDrop ? "translate-x-0 opacity-100" : "translate-x-[20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                />
            </div>
        </div>
    );
};
