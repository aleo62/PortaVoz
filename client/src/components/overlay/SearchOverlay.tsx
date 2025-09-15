import { IconHash, IconSearch, IconTableRow, IconUser } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { usePosts } from "@/hooks/posts/usePosts";
import { PostData } from "@/utils/types/postDataType";
import algolia from "@assets/images/svg/algolia-logo.svg";
import { useState } from "react";
import { OverlayTemplate, OverlayTemplateProps } from "../templates/OverlayTemplate";

export const SearchOverlay = ({ isOpen, onClose }: OverlayTemplateProps) => {
    const [search, setSearch] = useState<string>("");
    const { data: feedData } = usePosts({ search });

    let posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];
    return (
        <OverlayTemplate isOpen={isOpen} onClose={onClose}>
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="bg-body-background h-fit w-full max-w-xl rounded-xl"
            >
                <header className="text-title flex items-center px-5">
                    <IconSearch className="size-7" />
                    <input
                        type="text"
                        placeholder="Pesquisar por denúncias, comunidade, etc..."
                        className="text-title flex-1 border-0 px-2 py-5 text-sm outline-0"
                        onChange={(e) => setSearch(e.target.value)}
                        
                    />
                    <button
                        onClick={onClose}
                        className="h-fit rounded-sm bg-gradient-to-br from-stone-100 to-stone-300/50 to-125% p-1 px-3 text-sm shadow-[0px_3px_0px_0px_rgba(0,_0,_0,_0.3)] inset-ring-1 inset-ring-zinc-300 focus:translate-y-[3px] focus:shadow-[0px_1px_0px_0px_rgba(0,_0,_0,_0.3)] dark:from-stone-600 dark:to-stone-800 dark:text-white dark:inset-ring-zinc-900"
                    >
                        esc
                    </button>
                </header>
                <main className="border-y-1 border-zinc-300 py-2 dark:border-zinc-700">
                    <ul className="flex items-center border-b-1 border-zinc-200 text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
                        <li className="flex h-full w-full max-w-35 cursor-pointer items-center justify-center gap-1 py-2 text-sm">
                            <IconTableRow size={17} /> Denúncias
                        </li>
                        <li className="flex w-full max-w-35 cursor-pointer items-center justify-center gap-1 py-2">
                            <IconUser size={17} /> Usuários
                        </li>
                        <li className="flex w-full max-w-35 cursor-pointer items-center justify-center gap-1 py-2">
                            <IconHash size={17} /> Hashtags
                        </li>
                    </ul>
                    <p className="text-subtitle p-5 py-15">
                        {posts ? posts.map((post) => post.title) : "Nada encontrado ;("}{" "}
                    </p>
                </main>
                <footer className="flex items-center justify-end p-5">
                    <a
                        href="https://www.algolia.com/"
                        target="_blank"
                        className="text-title flex items-center justify-center gap-[0.35rem] text-sm font-medium"
                    >
                        Searched by{" "}
                        <img src={algolia} alt="Angolia" className="fill-title" width={80} />
                    </a>
                </footer>
            </motion.div>
        </OverlayTemplate>
    );
};
