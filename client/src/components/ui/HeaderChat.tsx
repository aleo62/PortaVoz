import { ChatData } from "@/utils/types/chatDataType";

type HeaderChatProps = {
    userId: string;
    chat: ChatData;
};

export const HeaderChat = ({ chat, userId }: HeaderChatProps) => {
    const userIndex = chat.participantsIndex[userId] === "userA" ? "userB" : "userA";
    return (
        <div
            className="text-title sticky top-0 flex h-fit items-center space-x-3 bg-white p-3 px-4 rounded-xl dark:bg-zinc-900 z-100"
   
        >
            <img src={chat.participantsPhotos[userIndex]} alt="" className="h-full rounded-full max-w-11 lg:max-w-12" />
            <p>{chat.participantsNames[userIndex]}</p>
        </div>
    );
};
