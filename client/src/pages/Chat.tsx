import { ChatMain } from "@/components/features/chat/ChatMain";
import { ChatSidebar } from "@/components/features/chat/ChatSidebar";
import { useChats } from "@/hooks/chat/useChats";
import { ChatData } from "@/types/chatDataType";
import { useState } from "react";

export type ChatProps = {
    currentChat: ChatData | null;
    setCurrentChat: (chat: ChatData | null) => void;
};

export const Chat = () => {
    const [currentChat, setCurrentChat] = useState<ChatData | null>(null);

    const { data: chatsData, isLoading: chatsLoading } = useChats();
    const chats: ChatData[] = chatsData?.pages.flatMap((page) => page.chats) ?? [];

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
