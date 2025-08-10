import { FilterDrop } from "@/components/drop/FilterDrop";
import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { Post } from "@/components/ui/Post";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { FiltersType } from "@/utils/types/filtersType";
import loading from "@assets/images/loading.gif";
import { usePosts } from "@hooks/posts/usePosts";
import {
    IconAdjustmentsHorizontal,
    IconChevronDown,
    IconPlus,
    IconSearch,
} from "@tabler/icons-react";
import { PostData } from "@utils/types/postDataType";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

export const Posts = () => {
    const navigate = useNavigate();
    const deletePost = useDeletePost();
    const [search, setSearch] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filters: FiltersType = {
        search: search,
        vote: "desc",
        date: "desc",
        tags: [],
        status: "ativo",
    };

    const { data, isLoading, fetchNextPage, hasNextPage } = usePosts(filters);

    const { ref, inView } = useInView({});
    let posts: PostData[] = (data?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    useEffect(() => {
        if (inView && !isLoading && hasNextPage) {
            console.log("capturando mais");
            fetchNextPage();
        }
    }, [inView]);

    const hadleDeletePost = async (id: string) => {
        // @ts-ignore
        posts = posts.filter((post: PostData) => post._id !== id);
        await deletePost.mutate(id);
    };

    return (
        <>
            <div className="w-full">
                <HeaderSidebar>
                    <div className="text-title flex w-full max-w-sm items-center gap-3 rounded-xl bg-white px-2 pl-4 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
                        <IconSearch className="h-8 w-8 fill-zinc-200 dark:fill-zinc-800" />
                        <input
                            type="text"
                            className="h-15 w-full py-1 text-sm outline-none"
                            placeholder="Busque por títulos..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div
                            className="bg-body-background text-title relative flex h-full w-fit items-center gap-1 rounded-lg p-2"
                            onClick={() => setIsFilterOpen(true)}
                        >
                            <IconAdjustmentsHorizontal />
                            <div className="relative">
                                <IconChevronDown className="size-3" />
                                <FilterDrop
                                    isOpen={isFilterOpen}
                                    orientation="top"
                                    onClose={() => setIsFilterOpen(false)}
                                />
                            </div>
                        </div>
                    </div>
                </HeaderSidebar>

                <div className="grid-cols grid w-full gap-5 lg:grid-cols-[1fr_1.5fr_1fr]">
                    <div></div>

                    {isLoading ? (
                        <img src={loading} alt="" className="mx-auto" />
                    ) : (
                        <section className="flex w-full flex-col items-center space-y-3">
                            {/* @ts-ignore */}
                            {posts.map((post: PostData) => (
                                <Post
                                    post={post}
                                    onDeletePost={async () => await hadleDeletePost(post._id)}
                                    key={post._id}
                                />
                            ))}

                            {hasNextPage && <div ref={ref}>carregando...</div>}
                        </section>
                    )}
                </div>
            </div>

            <button
                className="bg-accent absolute right-10 bottom-10 z-100 flex h-12 w-12 items-center justify-center rounded-full text-white"
                onClick={() => navigate("/createpost")}
            >
                <IconPlus size={25} />
            </button>
        </>
    );
};
