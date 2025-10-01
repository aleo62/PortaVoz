import { ChatData } from "@/utils/types/chatDataType";

export const ChatContainer = ({
    chat,
    joinChat,
}: {
    chat: ChatData;
    joinChat: (chatId: string) => void;
}) => {
    return (
        <div
            onClick={() => joinChat(chat._id)}
            key={chat._id}
            className="hover:bg-white/50 dark:hover:bg-zinc-900/50 flex w-full cursor-pointer items-center gap-5 rounded-xl bg-white p-5 py-4 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800"
        >
            <img src={chat.participants[0].image} alt="" className="h-12 w-12 rounded-full" />
            <p className="text-lg">{chat.participants[0].username}</p>
        </div>
    );
};
