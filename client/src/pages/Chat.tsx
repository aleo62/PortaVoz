import { ChatHeader } from "@/components/features/chat/ChatHeader";
import { ChatItem } from "@/components/features/chat/ChatItem";
import { ChatItemSkeleton } from "@/components/features/chat/ChatItemSkeleton";
import { ChatMessage } from "@/components/features/chat/ChatMessage";
import { InputChat } from "@/components/ui/ChatInput";
import { useChats } from "@/hooks/chat/useChats";
import { useMessages } from "@/hooks/messages/useMessages";
import { useStoreUser } from "@/stores/userStore";
import { ChatData } from "@/utils/types/chatDataType";
import { MessageData } from "@/utils/types/messageDataType";
import { IconSearch } from "@tabler/icons-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io, { Socket } from "socket.io-client";

export const Chat = () => {
    const params = useParams();
    const navigate = useNavigate();
    const chatRef = useRef<HTMLDivElement | null>(null);
    const [chatId, setChatId] = useState<string>("");
    const [inputText, setInputText] = useState<string>("");
    const { user: userData } = useStoreUser();
    const userId = userData?._id;
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);

    useEffect(() => {
        // SOCKET EVENTS
        socketRef.current = io(String(import.meta.env.VITE_API_BASEURL).replace("/api/v1/", ""));
        socketRef.current.emit("register_user", {
            userId,
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
        if (chatId) {
            socketRef?.current?.emit("join_chat", chatId);
            navigate(`/chat/${chatId}`);
        }
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
            <aside
                className={`text-title mr-auto h-screen w-full bg-white lg:max-w-89 dark:bg-zinc-900 ${chatId && "max-lg:hidden"} divide-y-1 divide-zinc-200 border-x-1 border-x-zinc-200 dark:divide-zinc-800 dark:border-x-zinc-800 dark:border-r-zinc-800`}
            >
                <header className="px-5 py-6">
                    <h1 className="text-title flex items-center text-xl font-medium">Conversas</h1>
                    <div className="mt-4 flex items-center gap-1 rounded-lg pl-3 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800">
                        <IconSearch className="size-4" />
                        <input
                            type="text"
                            placeholder="Pesquisar por uma conversa..."
                            className="flex-1 border-0 p-2 py-3 text-sm outline-0"
                        />
                    </div>
                </header>

                <div className={`w-full space-y-3 px-2 pt-6`}>
                    {chatsLoading ? (
                        <ChatItemSkeleton />
                    ) : (
                        <>
                            {!chats.length ? (
                                <div className="mx-auto mt-8 text-center text-zinc-500">
                                    <p className="text-lg">Sem chats cara</p>
                                    <p className="mt-4 text-3xl">(ㆆ_ㆆ)</p>
                                </div>
                            ) : (
                                chats.map((chat) => (
                                    <ChatItem
                                        key={chat._id}
                                        joinChat={() => setChatId(chat._id)}
                                        chat={chat}
                                    />
                                ))
                            )}
                        </>
                    )}
                </div>
            </aside>

            <div
                className={`relative flex h-full w-full flex-col ${!chatId && "max-lg:hidden"} max-lg:my-auto`}
            >
                {chatId && currentChat && <ChatHeader chat={currentChat} setChatId={setChatId} />}
                <div
                    className="scrollbar-thin my-2 flex-1 space-y-2 overflow-y-auto lg:px-6"
                    ref={chatRef}
                >
                    {messages.map((message, index) => (
                        <ChatMessage
                            key={message._id ?? index}
                            message={message}
                            userId={userId!}
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
        </>
    );
};
