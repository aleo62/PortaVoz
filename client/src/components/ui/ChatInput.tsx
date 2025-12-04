import { IconSend2 } from "@tabler/icons-react";
import { Dispatch, FormEvent, SetStateAction } from "react";

type InputChatProps = {
    handleSend: (inputText: string, e: FormEvent) => void;
    setInputText: Dispatch<SetStateAction<string>>;
    inputText: string;
};

export const InputChat = ({ handleSend, setInputText, inputText }: InputChatProps) => {
    return (
        <form
            className="text-title flex h-fit static items-center space-x-3 border-t-1 border-zinc-200 dark:border-zinc-800 bg-white p-1.5 pl-2 md:pl-3 dark:bg-zinc-900"
            onSubmit={(e) => handleSend(inputText, e)}
        >
            <input
                type="text"
                className="md:text-[14px] w-full rounded-xl p-4 px-5 text-sm outline-none"
                placeholder="Digite aqui..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button className="bg-accent flex h-[45px] w-[45px] md:w-[50px] md:h-[50px] items-center justify-center aspect-square rounded-2xl text-white">
                <IconSend2 className="size-5 md:size-5  stroke-[1.5px]" />
            </button>
        </form>
    );
};
