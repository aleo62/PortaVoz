import { IconHash, IconSearch, IconTableRow, IconUser, IconX } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { ModalDefaultProps } from "@/contexts/ModalContext";
import { usePosts } from "@/hooks/posts/usePosts";
import { useUsers } from "@/hooks/user/useUsers";
import { PostData } from "@/types/postDataType";
import { UserData } from "@/types/userDataType";
import { SetStateAction, useEffect, useState } from "react";
import { SpinnerCircular } from "spinners-react";
import { PostSearchItem } from "./PostSearchItem";
import { UserSearchItem } from "./UserSearchItem";

export const SearchModal = ({ zIndex, closeModal }: ModalDefaultProps) => {
    const searchTopics = [
        { id: 1, label: "Denúncias", Icon: IconTableRow },
        { id: 2, label: "Usuários", Icon: IconUser },
        { id: 3, label: "Hashtags", Icon: IconHash },
    ];
    const [activeTopic, setActiveTopic] = useState<1 | 2 | 3>(1);

    const [search, setSearch] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const { data: feedData, isLoading: feedLoading } = usePosts({ search }, activeTopic == 1);

    const { data: usersData, isLoading: usersLoading } = useUsers(activeTopic == 2, search);

    let posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];
    let users: UserData[] = (usersData?.pages.flatMap((page) => page.users) as UserData[]) || [];

    useEffect(() => {
        setIsTyping(true);

        const timeout = setTimeout(() => {
            setSearch(searchInput);
            setIsTyping(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="bg-body-background h-fit w-full max-w-xl rounded-xl"
            style={{ zIndex }}
        >
            <header className="text-title flex items-center px-3 lg:px-5">
                <IconSearch className="size-6 lg:size-7" />
                <input
                    type="text"
                    placeholder="Pesquisar por denúncias, comunidade, etc..."
                    className="text-title flex-1 border-0 px-2 py-5 text-sm outline-0"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <span
                    className="ml-auto cursor-pointer rounded-full bg-zinc-200/60 p-2 hover:bg-zinc-200 dark:bg-zinc-800/60 hover:dark:bg-zinc-800"
                    onClick={closeModal}
                >
                    <IconX className="text-subtitle size-4" />
                </span>
            </header>
            <main className="py-2">
                <ul className="flex items-center border-b-1 border-zinc-200 px-2 text-zinc-400 lg:px-5 dark:border-zinc-800 dark:text-zinc-600">
                    {searchTopics.map((topic) => (
                        <li
                            className={`flex h-full w-full cursor-pointer items-center justify-center gap-1 py-2 text-sm ${activeTopic === topic.id && "text-title border-b-title border-b-1 transition-all"}`}
                            key={topic.id}
                            onClick={() => setActiveTopic(topic.id as SetStateAction<1 | 2 | 3>)}
                        >
                            <topic.Icon size={17} /> {topic.label}
                        </li>
                    ))}
                </ul>
                <div className="text-subtitle w-full space-y-1.5 p-2 lg:p-4">
                    {isTyping ? (
                        <SpinnerCircular
                            size={30}
                            thickness={180}
                            speed={100}
                            color="#3d69d8"
                            secondaryColor="rgba(0, 0, 0, 0)"
                            className="mx-auto"
                        />
                    ) : (
                        <>
                            {activeTopic === 1 &&
                                (posts.length > 0 ? (
                                    posts.map((post) => <PostSearchItem post={post} />)
                                ) : feedLoading ? (
                                    <SpinnerCircular
                                        size={30}
                                        thickness={180}
                                        speed={100}
                                        color="#3d69d8"
                                        secondaryColor="rgba(0, 0, 0, 0)"
                                        className="mx-auto"
                                    />
                                ) : (
                                    "Nada encontrado ;("
                                ))}

                            {activeTopic === 2 &&
                                (users.length > 0 ? (
                                    users.map((user) => <UserSearchItem user={user} />)
                                ) : usersLoading ? (
                                    <SpinnerCircular
                                        size={30}
                                        thickness={180}
                                        speed={100}
                                        color="#3d69d8"
                                        secondaryColor="rgba(0, 0, 0, 0)"
                                        className="mx-auto"
                                    />
                                ) : (
                                    "Nada encontrado ;("
                                ))}
                        </>
                    )}
                </div>
            </main>
        </motion.div>
    );
};
