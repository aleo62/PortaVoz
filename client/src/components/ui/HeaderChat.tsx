import { ChatData } from "@/utils/types/chatDataType";
import { IconChevronLeft } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

type HeaderChatProps = {
    userId: string;
    chat: ChatData;
    setChatId: Dispatch<SetStateAction<string>>;
};

export const HeaderChat = ({ chat, userId, setChatId }: HeaderChatProps) => {
    const navigate = useNavigate();
    const userIndex = chat.participantsIndex[userId] === "userA" ? "userB" : "userA";
    return (
        <div className="text-title z-100 flex h-fit lg:px-7 items-center rounded-xl bg-white p-3 lg:p-4 px-4 dark:bg-zinc-900">
            <IconChevronLeft
                className="size-4 mr-1 lg:hidden"
                onClick={() => {
                    setChatId("");
                    navigate("/chat");
                }}
            />
            <img
                src={chat.participantsPhotos[userIndex]}
                alt=""
                className="h-full max-w-11 rounded-full lg:max-w-12 mr-2"
            />
            <p>{chat.participantsNames[userIndex]}</p>
        </div>
    );
};
