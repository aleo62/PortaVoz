import { ChatData } from "@/utils/types/chatDataType";

export const ChatContainer = ({
    chat,
    userId,
    joinChat,
}: {
    chat: ChatData;
    userId: string;
    joinChat: (chatId: string) => void;
}) => {
    const userIndex = chat.participantsIndex[userId] === "userA" ? "userB" : "userA";
    return (
        <div
            onClick={() => joinChat(chat._id)}
            key={chat._id}
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
};
