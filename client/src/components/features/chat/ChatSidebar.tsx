import { ToggleSidebar } from "@/components/ui/ToggleSidebar";
import { ChatProps } from "@/pages/Chat";
import { ChatData } from "@/types/chatDataType";
import { IconSearch } from "@tabler/icons-react";
import { ChatItem } from "./ChatItem";
import { ChatItemSkeleton } from "./ChatItemSkeleton";
import { useIsMobile } from "@/hooks/useIsMobile";

export const ChatSidebar = ({
    chats,
    chatsLoading,
    currentChat,
    setCurrentChat,
}: { chats: ChatData[]; chatsLoading: boolean } & ChatProps) => {
    if(currentChat && useIsMobile()) return null;

    return (
        <aside
            className={` text-title mr-auto h-screen w-full divide-y-1 divide-zinc-200 border-r-1 border-zinc-200 bg-white lg:max-w-89 dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900`}
        >
            <header className="px-5 py-6">
                <h1 className="text-title flex items-center space-x-2 text-xl font-medium">
                    <ToggleSidebar /> <p>Conversas</p>
                </h1>
                <div className="mt-4 flex items-center gap-1 rounded-lg pl-3 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800">
                    <IconSearch className="size-4" />
                    <input
                        type="text"
                        placeholder="Pesquisar por uma conversa..."
                        className="flex-1 border-0 p-2 py-3 text-sm outline-0"
                    />
                </div>
            </header>

            <div className={`w-full space-y-3 px-5 pt-6`}>
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
                                    joinChat={() =>
                                        setCurrentChat(
                                            chats.find((chatItem) => chatItem._id === chat._id)!,
                                        )
                                    }
                                    chat={chat}
                                />
                            ))
                        )}
                    </>
                )}
            </div>
        </aside>
    );
};
