import { ChatData } from "@/utils/types/chatDataType";
import { IconChevronLeft } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

export const ChatHeader = ({
    chat,
    setChatId,
}: {
    chat: ChatData;
    setChatId: Dispatch<SetStateAction<string>>;
}) => {
    const navigate = useNavigate();

    return (
        <div className="text-title z-100 flex h-fit items-center border-b-1 border-b-zinc-200 bg-white p-3 px-4 lg:p-4 lg:px-7 dark:border-b-zinc-800 dark:bg-zinc-900">
            <IconChevronLeft
                className="mr-1 size-4 lg:hidden"
                onClick={() => {
                    setChatId("");
                    navigate("/chat");
                }}
            />
            <img
                src={chat.participants[0].image}
                alt=""
                className="mr-2 h-full max-w-11 rounded-full lg:max-w-12"
            />
            <p>{chat.participants[0].username}</p>
        </div>
    );
};
