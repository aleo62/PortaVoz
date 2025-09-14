import { MessageData } from "@/utils/types/messageDataType";

export const Message = ({
    message,
    userId,
    ownNext,
}: {
    message: MessageData;
    userId: string;
    ownNext: boolean;
}) => {
    const now = new Date(Date.now());
    const date = new Date(message.createdAt);

    let messageDate;
    if (date.getDate() == now.getDate())
        messageDate = `${String(date.getHours()).length <= 1 ? `0${date.getHours()}` : date.getHours()}:${String(date.getMinutes()).length <= 1 ? `0${date.getMinutes()}` : date.getMinutes()}`;
    else messageDate = `${date.getDate()}/${date.getMonth()}`;

    const ownMessage = message.senderId === userId;

    return (
        <div
            key={message._id}
            className={`${!ownMessage ? "bg-accent text-white" : "text-title ml-auto bg-white dark:bg-zinc-900"} ${!ownNext ? `${ownMessage ? "rounded-t-xl rounded-bl-xl" : "rounded-t-xl rounded-br-xl"}` : "rounded-xl"} relative flex w-fit justify-between p-3 px-5 pr-11 pb-4`}
        >
            <p className="md:text-md w-fit text-sm">{message.text}</p>

            <p
                className={`${ownMessage ? "text-subtitle" : "text-zinc-300"} absolute right-2.5 bottom-2 mt-1 flex h-11 w-fit items-end text-[10px]`}
            >
                {/* <IconChevronDown className="mb-2 size-5 text-subtitle"/> */}
                {messageDate}
            </p>
        </div>
    );
};
