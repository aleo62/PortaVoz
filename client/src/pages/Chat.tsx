import { ChatContainer } from "@/components/ui/ChatContainer";
import { ChatContainerSkeleton } from "@/components/ui/ChatContainerSkeleton";
import { HeaderChat } from "@/components/ui/HeaderChat";
import { InputChat } from "@/components/ui/InputChat";
import { Message } from "@/components/ui/Message";
import { useUser } from "@/contexts/UserContext";
import { useChats } from "@/hooks/chat/useChats";
import { useMessages } from "@/hooks/messages/useMessages";
import { ChatData } from "@/utils/types/chatDataType";
import { MessageData } from "@/utils/types/messageDataType";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

export const Chat = () => {
    const params = useParams();
    const chatRef = useRef<HTMLDivElement | null>(null);
    const [chatId, setChatId] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const { userData } = useUser();
    const userId = userData?._publicId;
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        // SOCKET EVENTS
        socketRef.current = io(String(import.meta.env.VITE_API_BASEURL).replace("/api/v1/", ""));
        socketRef.current.emit("register_user", {
            userId: userData?._publicId,
        });

        socketRef.current.on("new_message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socketRef?.current?.disconnect();
        };
    }, []);

    // HANDLE FETCH CHATS
    const { data: chatsData, isLoading: chatsLoading } = useChats();
    const chats: ChatData[] = chatsData?.pages.flatMap((page) => page.chats) ?? [];

    // HANDLE JOIN CHAT
    useEffect(() => {
        if (chatId) socketRef?.current?.emit("join_chat", chatId);
    }, [chatId]);
    useEffect(() => {
        if (!chatsLoading) setChatId(params.chatId!);
    }, [chatsLoading]);

    const currentChat = chats.find((chat) => chat._id === chatId)!;

    // HANDLE SEND MESSAGE
    const handleSend = (text: string, e: FormEvent) => {
        e.preventDefault();
        if (!text) return;

        socketRef?.current?.emit("send_message", {
            chatId,
            senderId: userId,
            text,
        });

        setInputText("");
    };

    // HANDLE FETCH MESSAGES
    const { data: messagesData } = useMessages(chatId);

    useEffect(() => {
        setMessages(messagesData?.pages.flatMap((page) => page.messages) ?? []);
    }, [messagesData]);
    useEffect(() => {
        chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
    }, [messages]);

    return (
        <>
            <div className="flex w-full items-center divide-zinc-300 lg:gap-5 lg:divide-x-1 dark:divide-zinc-700">
                <aside
                    className={`text-title mr-auto w-full lg:max-w-89 h-full lg:p-3 lg:py-8 ${chatId && "max-lg:hidden"}`}
                >
                    <h1 className="mb-4 px-1 text-2xl font-medium lg:mb-7">Chats</h1>

                    <div className={`w-full space-y-3`}>
                        {chatsLoading ? (
                            <ChatContainerSkeleton />
                        ) : (
                            <>
                                {!chats.length && (
                                    <div className="mx-auto mt-8 text-center text-zinc-500">
                                        <p className="text-lg">Sem chats cara</p>
                                        <p className="mt-4 text-3xl">(ㆆ_ㆆ)</p>
                                    </div>
                                )}
                                {chats.map((chat) => (
                                    <ChatContainer
                                        key={chat._id}
                                        joinChat={() => setChatId(chat._id)}
                                        chat={chat}
                                        userId={userId}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                </aside>

                <div className={`relative flex w-full flex-col h-full lg:p-1 lg:py-3 ${!chatId && "max-lg:hidden"}`}>
  
                    {chatId && currentChat && <HeaderChat userId={userId} chat={currentChat} />}
                    <div
                        className="scrollbar-thin flex-1 space-y-2 overflow-y-auto my-1 lg:px-6"
                        ref={chatRef}
                    >
                        {messages.map((message, index) => (
                            <Message
                                key={message._id ?? index}
                                message={message}
                                userId={userId}
                                ownNext={
                                    index < messages.length - 1 &&
                                    messages[index + 1]?.senderId === message.senderId
                                }
                            />
                        ))}
                    </div>

                    {chatId && (
                        <InputChat
                            handleSend={handleSend}
                            setInputText={setInputText}
                            inputText={inputText}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
