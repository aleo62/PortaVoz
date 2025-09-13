import { ChatContainer } from "@/components/ui/ChatContainer";
import { ChatContainerSkeleton } from "@/components/ui/ChatContainerSkeleton";
import { useUser } from "@/contexts/UserContext";
import { useChats } from "@/hooks/chat/useChats";
import { useMessages } from "@/hooks/messages/useMessages";
import { ChatData } from "@/utils/types/chatDataType";
import { MessageData } from "@/utils/types/messageType";
import { IconSend2 } from "@tabler/icons-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

export const Chat = () => {
    const params = useParams();
    const chatRef = useRef<HTMLDivElement | null>(null);
    const [chatId, setChatId] = useState<string>(params.chatId!);
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
            <div className="flex w-full items-center gap-5 divide-x-1 divide-zinc-300 dark:divide-zinc-700">
                <aside className="text-title mr-auto h-full w-full max-w-89 p-3 py-8">
                    <h1 className="mb-7 text-2xl font-medium">Chats</h1>

                    <div className="w-full space-y-3">
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

                <div className="relative flex h-full max-h-[100vh] w-full flex-col space-y-2 p-3 py-8 max-lg:hidden">
                    <div
                        className="scrollbar-thin flex-1 space-y-2 overflow-y-auto px-6"
                        ref={chatRef}
                    >
                        {messages.map((message) => {
                            const now = new Date(Date.now());
                            const date = new Date(message.createdAt);
                            let messageDate;
                            if (date.getDate() == now.getDate())
                                messageDate = `${date.getHours()}:${date.getMinutes()}`;
                            else messageDate = `${date.getDate()}/${date.getMonth()}`;

                            return (
                                <div
                                    key={message._id}
                                    className={`${message.senderId !== userId ? "bg-accent text-white" : "text-title ml-auto bg-white dark:bg-zinc-900"} flex w-fit justify-between rounded-xl p-4 pb-2 pl-6`}
                                >
                                    <p className="w-fit">{message.text}</p>

                                    <p className="text-subtitle mt-1 flex h-11 w-fit items-end text-xs">
                                        {/* <IconChevronDown className="mb-2 size-5 text-subtitle"/> */}
                                        {messageDate}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    {chatId && (
                        <form
                            className="text-title sticky bottom-0 flex h-fit items-center space-x-3 rounded-3xl bg-white p-2 pl-5 dark:bg-zinc-900"
                            onSubmit={(e) => handleSend(inputText, e)}
                        >
                            <input
                                type="text"
                                className="w-full rounded-xl p-4 px-5 outline-none"
                                placeholder="Digite aqui..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button className="bg-accent flex h-13 w-13 items-center justify-center rounded-2xl text-white">
                                <IconSend2 className="stroke-[1.5px]" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};
