import { ChatData } from "@/utils/types/chatDataType";

export const ChatContainer = ({
    chat,
    joinChat,
}: {
    chat: ChatData;
    joinChat: (chatId: string) => void;
}) => {
    if(!chat) return;

    return (
        <div
            onClick={() => joinChat(chat._id)}
            key={chat._id}
            className=" flex w-full cursor-pointer rounded-xl items-center gap-3 py-3 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
            <img src={chat.participants[0]?.image} alt="" className="h-11 w-11 rounded-full" />
            <p className="text-md font-medium">{chat.participants[0]?.username}</p>
        </div>
    );
};
