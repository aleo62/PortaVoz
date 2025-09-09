import { useUser } from "@/contexts/UserContext";
import { useChats } from "@/hooks/chat/useChats";
import { useMessages } from "@/hooks/messages/useMessages";
import { ChatData } from "@/utils/types/chatDataType";
import { MessageData } from "@/utils/types/messageType";
import { IconSend2 } from "@tabler/icons-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

export const Chat = () => {
    const chatRef = useRef<HTMLDivElement | null>(null);
    const [chatId, setChatId] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const { userData } = useUser();
    const userId = userData?._publicId;
    const socketRef = useRef<Socket | null>(null);
    const [messages, setMessages] = useState<MessageData[]>([]);
    useEffect(() => {
        socketRef.current = io(String(import.meta.env.VITE_API_BASEURL).replace("/api/v1/", ""));
        // socketRef.current.emit("register_user", {
        //     userId: userData?._publicId,
        // });

        socketRef.current.on("new_message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socketRef?.current?.disconnect();
        };
    }, []);

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
    useEffect(() => {
        chatRef.current!.scrollTop = chatRef.current!.scrollHeight;
    }, [messages])

    const { data: messagesData } = useMessages(chatId);
    const { data } = useChats();

    const chats: ChatData[] = data?.pages.flatMap((page) => page.chats) ?? [];
    const messagesA: MessageData[] = messagesData?.pages.flatMap((page) => page.messages) ?? [];

    const joinChat = (chatId: string) => {
        socketRef?.current?.emit("join_chat", chatId);
        setChatId(chatId);
    };

    useEffect(() => {
        if (messagesA.length > 0) {
            setMessages(messagesA);
        }
    }, [messagesData]);

    return (
        <>
            <div className="flex w-full items-center gap-5">
                <aside className="text-title mr-auto h-full w-full max-w-89 rounded-2xl p-3 py-8">
                    <h1 className="mb-7 text-2xl font-medium">Chats</h1>

                    {chats.length > 0 ? (
                        <div className="w-full space-y-3">
                            {chats.map((chat) => {
                                const userIndex =
                                    chat.participantsIndex[userId] === "userA" ? "userB" : "userA";
                                return (
                                    <div
                                        onClick={() => joinChat(chat._id)}
                                        className="hover:bg-body-background flex w-full cursor-pointer items-center gap-5 rounded-xl bg-white p-5 py-4 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
                                    >
                                        <img
                                            src={chat.participantsPhotos[userIndex]}
                                            alt=""
                                            className="h-12 w-12 rounded-full"
                                        />
                                        <p className="text-lg">{chat.participantsNames[userIndex]}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mx-auto w-fit">
                            <p className="text-subtitle mx-auto mb-2 max-w-50 text-center">
                                Você não tem chats, mas tem ele
                            </p>
                            <img
                                src="https://media.tenor.com/pzaBHhUlVQ8AAAAM/gato-dan%C3%A7ando.gif"
                                alt=""
                            />
                        </div>
                    )}
                </aside>

                <div className="relative flex h-full max-h-[100vh] w-full flex-col space-y-2 p-3 py-8 max-lg:hidden">
                    <div className="scrollbar-thin flex-1 space-y-2 overflow-y-auto px-6" ref={chatRef}>
                        {messages.map((message) => {
                            const now = new Date(Date.now());
                            const date = new Date(message.createdAt);
                            let messageDate;
                            if (date.getDate() == now.getDate())
                                messageDate = `${date.getHours()}:${date.getMinutes()}`;
                            else messageDate = `${date.getDate()}/${date.getMonth()}`;

                            return (
                                <>
                                    <div
                                        className={`${message.senderId !== userId ? "bg-accent text-white" : "text-title ml-auto bg-white dark:bg-zinc-900"} w-fit rounded-xl p-4 pb-2 pl-6 flex justify-between`}
                                    >
                                        <p className="w-fit">{message.text}</p>

                                        <p className="text-subtitle mt-1 w-fit text-xs flex items-end h-11">
                                            {/* <IconChevronDown className="mb-2 size-5 text-subtitle"/> */}
                                            {messageDate}
                                        </p>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    {!chatId ? (
                        "skibidi"
                    ) : (
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
