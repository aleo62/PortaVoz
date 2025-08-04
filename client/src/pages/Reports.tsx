import { FilterContainer } from "@/components/otros/FilterContainer";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { FiltersType } from "@/utils/types/filtersType";
import loading from "@assets/images/loading.gif";
import { Report } from "@components/otros/Report";
import { usePosts } from "@hooks/posts/usePosts";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { PostData } from "@utils/types/postDataType";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
    const navigate = useNavigate();
    const deletePost = useDeletePost();
    const [search, setSearch] = useState("");

    const filters: FiltersType = {
        search: search,
        vote: "desc",
        date: "desc",
        tags: [],
        status: "ativo",
    };

    const { data, isLoading, fetchNextPage, hasNextPage } = usePosts(filters);

    const { ref, inView } = useInView({});
    const posts: PostData[] = (data?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    useEffect(() => {
        if (inView && !isLoading && hasNextPage) {
            console.log("capturando mais");
            fetchNextPage();
        }
    }, [inView]);

    const hadleDeletePost = async (id: string) => {
        await deletePost.mutate(id);
        // @ts-ignore
        posts.filter((post: PostData) => post._id !== id);
    };

    return (
        <>
            <div className="grid h-full w-full grid-cols-1 justify-center gap-3 lg:grid-cols-[1fr_2fr_1fr]">
                <aside className="flex w-full flex-col gap-4 py-3 lg:items-end">
                    <div className="text-title flex w-full items-center gap-2 rounded-lg bg-white px-2 pl-4 ring-1 ring-zinc-200 md:max-w-[300px] dark:bg-zinc-900 dark:ring-zinc-700">
                        <IconSearch className="fill-zinc-200 dark:fill-zinc-700" />
                        <input
                            type="text"
                            className="w-full py-3 text-sm outline-none"
                            placeholder="Busque por títulos..."
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <FilterContainer />
                </aside>
                {isLoading ? (
                    <img src={loading} alt="" className="mx-auto" />
                ) : (
                    <section className="flex w-full flex-col items-center space-y-3">
                        {/* @ts-ignore */}
                        {posts.map((post: PostData) => (
                            <Report
                                report={post}
                                onDeletePost={async () => await hadleDeletePost(post._id)}
                                key={post._id}
                            />
                        ))}

                        {hasNextPage && <div ref={ref}>carregando...</div>}
                    </section>
                )}
            </div>

            <button
                className="bg-accent absolute right-10 bottom-10 z-100 flex h-12 w-12 items-center justify-center rounded-full text-white"
                onClick={() => navigate("/createreport")}
            >
                <IconPlus size={25} />
            </button>
        </>
    );
};
