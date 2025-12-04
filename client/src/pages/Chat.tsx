import { ChatMain } from "@/components/features/chat/ChatMain";
import { ChatSidebar } from "@/components/features/chat/ChatSidebar";
import { useChats } from "@/hooks/chat/useChats";
import { ChatData } from "@/types/chatDataType";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export type ChatProps = {
    currentChat: ChatData | null;
    setCurrentChat: (chat: ChatData | null) => void;
};

export const Chat = () => {
    const { state } = useLocation();

    const [currentChat, setCurrentChat] = useState<ChatData | null>(null);
    const { data: chatsData, isLoading: chatsLoading } = useChats();
    const chats: ChatData[] = chatsData?.pages.flatMap((page) => page.chats) ?? [];

    useEffect(() => {
        if (state?.chatId) {
            setCurrentChat(chats.find((chat) => chat._id === state.chatId)!);
        }
    }, [state, chatsData]);

    return (
        <>
            <ChatSidebar
                chats={chats}
                chatsLoading={chatsLoading}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
            />
            <ChatMain currentChat={currentChat} setCurrentChat={setCurrentChat} />
        </>
    );
};
