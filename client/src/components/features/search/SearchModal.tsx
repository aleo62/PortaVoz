import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { usePosts } from "@/hooks/posts/usePosts";
import { useHashtags } from "@/hooks/useHashtags";
import { useUsers } from "@/hooks/user/useUsers";
import { PostData } from "@/types/postDataType";
import { UserData } from "@/types/userDataType";
import { IconHash, IconSearch, IconTableRow, IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { PostSearchItem } from "./PostSearchItem";
import { UserSearchItem } from "./UserSearchItem";

export const SearchModal = ({ zIndex }: ModalDefaultProps) => {
    const { closeModal } = useModal();
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

    const { data: hashtagData = [], isLoading: hashtagsLoading } = useHashtags(
        activeTopic === 3 ? search : "",
    );

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

    const filteredHashtags = useMemo<string[]>(() => {
        const list = hashtagData.map((h: any) =>
            typeof h === "string" ? h : (h.content ?? h._id ?? ""),
        );
        if (!search) return list;
        return list.filter((h: string) => h.toLowerCase().includes(search.toLowerCase()));
    }, [hashtagData, search]);

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="relative mx-auto my-auto flex h-full max-h-[65vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <header className="text-title flex items-center border-b border-zinc-200 px-3 lg:px-5 dark:border-zinc-800">
                <IconSearch className="size-6 lg:size-7" />
                <input
                    type="text"
                    placeholder="Pesquisar por denúncias, comunidade, etc..."
                    className="text-title flex-1 border-0 bg-transparent px-2 py-5 text-sm outline-0"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <ModalProvider.Close />
            </header>
            <main className="flex flex-1 flex-col overflow-hidden">
                <ul className="scrollbar-thin scrollbar-thumb-zinc-200 scrollbar-track-transparent dark:scrollbar-thumb-zinc-700 flex items-center border-b border-zinc-200 px-2 text-zinc-500 lg:px-5 dark:border-zinc-800 dark:text-zinc-500">
                    {searchTopics.map((topic) => (
                        <li
                            className={`flex h-full w-full cursor-pointer items-center justify-center gap-1 py-3 text-sm font-medium transition ${
                                activeTopic === topic.id
                                    ? "text-title border-b-2 border-b-blue-500"
                                    : "hover:text-title"
                            }`}
                            key={topic.id}
                            onClick={() => setActiveTopic(topic.id as SetStateAction<1 | 2 | 3>)}
                        >
                            <topic.Icon size={17} /> {topic.label}
                        </li>
                    ))}
                </ul>
                <div className="text-subtitle flex-1 space-y-2 overflow-auto p-3 lg:p-5">
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
                                    posts.map((post) => (
                                        <PostSearchItem
                                            key={post._id}
                                            post={post}
                                            onSelect={closeModal}
                                        />
                                    ))
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
                                    users.map((user) => (
                                        <UserSearchItem
                                            key={user._id}
                                            user={user}
                                            onSelect={closeModal}
                                        />
                                    ))
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

                            {activeTopic === 3 &&
                                (filteredHashtags.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {filteredHashtags.map((tag: string) => (
                                            <Link
                                                key={tag}
                                                to={{
                                                    pathname: `/feed`,
                                                    search: `?hashtag=${tag}`,
                                                }}
                                                onClick={() => closeModal()}
                                                className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 ring-1 ring-zinc-200 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700 dark:hover:bg-zinc-700/80"
                                            >
                                                #{tag}
                                            </Link>
                                        ))}
                                    </div>
                                ) : hashtagsLoading ? (
                                    <SpinnerCircular
                                        size={30}
                                        thickness={180}
                                        speed={100}
                                        color="#3d69d8"
                                        secondaryColor="rgba(0, 0, 0, 0)"
                                        className="mx-auto"
                                    />
                                ) : (
                                    "Nenhuma hashtag encontrada ;("
                                ))}
                        </>
                    )}
                </div>
            </main>
        </motion.div>
    );
};
