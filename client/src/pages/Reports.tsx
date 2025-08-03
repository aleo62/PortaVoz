import { FilterContainer } from "@/components/otros/FilterContainer";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { FiltersType } from "@/utils/types/filtersType";
import loading from "@assets/images/loading.gif";
import { Report } from "@components/otros/Report";
import { usePosts } from "@hooks/posts/usePosts";
import { IconPlus } from "@tabler/icons-react";
import { PostData } from "@utils/types/postDataType";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

export const Reports = () => {
    const navigate = useNavigate();
    const deletePost = useDeletePost();

    const filters: FiltersType = {
        vote: "desc",
        date: "desc",
        tags: [],
        status: "ativo",
    };

    const { data, isLoading, fetchNextPage, hasNextPage } = usePosts(filters);

    const { ref, inView } = useInView({});
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

    if (isLoading) {
        return <img src={loading} alt="" />;
    }

    return (
        <>
            <aside className="flex justify-end w-full max-w-[300px]">
                <FilterContainer />
            </aside>
            <section className="w-full space-y-3 max-w-xl">
                {/* @ts-ignore */}
                {data?.pages.map((page) =>
                    page.posts.map((post: PostData) => (
                        <Report
                            report={post}
                            onDeletePost={async () => await hadleDeletePost(post._id)}
                            key={post._id}
                        />
                    )),
                )}

                {hasNextPage && <div ref={ref}>carregando...</div>}
            </section>
            <aside className="flex justify-end w-full max-w-[300px]">
                <FilterContainer />
            </aside>

            <button
                className="bg-accent absolute right-10 bottom-10 flex h-12 w-12 z-100 items-center justify-center rounded-full text-white"
                onClick={() => navigate("/createreport")}
            >
                <IconPlus size={25} />
            </button>
        </>
    );
};
