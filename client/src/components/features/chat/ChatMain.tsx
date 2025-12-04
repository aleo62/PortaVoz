import { InputChat } from "@/components/ui/ChatInput";
import { useSocket } from "@/contexts/SocketContext";
import { useMessages } from "@/hooks/messages/useMessages";
import { ChatProps } from "@/pages/Chat";
import { useStoreUser } from "@/stores/userStore";
import { MessageData } from "@/types/messageDataType";
import { FormEvent, useEffect, useState } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";

export const ChatMain = ({ currentChat, setCurrentChat }: ChatProps) => {
    const socket = useSocket();
    const { user } = useStoreUser();
    const [inputText, setInputText] = useState<string>("");
    const [messages, setMessages] = useState<MessageData[]>([]);
    const { data: messagesData } = useMessages(currentChat?._id ?? "");

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (message: MessageData) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("new_message", handleNewMessage);

        return () => {
            socket.off("new_message", handleNewMessage);
        };
    }, [socket]);

    useEffect(() => {
        if (currentChat?._id) {
            socket?.emit("join_chat", currentChat._id);
        }

        return () => {
            socket?.emit("leave_chat");
        };
    }, [currentChat, socket]);

    useEffect(() => {
        const fetchedMessages = messagesData?.pages.flatMap((page) => page.messages) ?? [];
        setMessages(fetchedMessages);
    }, [messagesData]);

    const handleSend = (text: string, e: FormEvent) => {
        e.preventDefault();
        if (!text) return;
        if (!user?._id || !currentChat) return;

        socket?.emit("send_message", {
            chatId: currentChat._id,
            senderId: user._id,
            text,
        });

        setInputText("");
    };
    if (!currentChat || !user) return null;

    return (
        <main className={`relative flex h-full w-full flex-col max-lg:my-auto`}>
            <ChatHeader chat={currentChat} onBack={() => setCurrentChat(null)} />
            <div className="scrollbar-thin my-2 flex-1 space-y-2 overflow-y-auto lg:px-6">
                {messages.map((message, index) => (
                    <ChatMessage
                        key={message._id ?? index}
                        message={message}
                        userId={user._id}
                        ownNext={
                            index < messages.length - 1 &&
                            messages[index + 1]?.senderId === message.senderId
                        }
                    />
                ))}
            </div>

            <InputChat handleSend={handleSend} setInputText={setInputText} inputText={inputText} />
        </main>
    );
};
