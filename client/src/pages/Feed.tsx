import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { Post } from "@/components/ui/Post";
import { PostPreview } from "@/components/ui/PostPreview";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useIsMobile } from "@/utils/isMobile";
import loading from "@assets/images/loading.gif";
import { usePosts } from "@hooks/posts/usePosts";
import { IconPlus } from "@tabler/icons-react";
import { PostData } from "@utils/types/postDataType";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Posts = () => {
    const navigate = useNavigate();
    const deletePost = useDeletePost();

    const {
        data: feedData,
        isLoading: feedLoading,
        fetchNextPage: fetchFeedNextPage,
        hasNextPage: feedHasNextPage,
    } = usePosts({});
    const {
        data: reflectedData,
        // isLoading: reflectedLoading,
        // fetchNextPage: fetchReflectedNextPage,
        // hasNextPage: reflectedHasNextPage,
    } = usePosts({ vote: "desc" });

    const { ref, inView } = useInView({});
    let posts: PostData[] = (feedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];
    let reflectedPosts: PostData[] =
        (reflectedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    useEffect(() => {
        if (inView && !feedLoading && feedHasNextPage) {
            fetchFeedNextPage();
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
                {!useIsMobile() && <HeaderSidebar />}
                <div className="mx-auto w-full max-w-6xl gap-3 space-y-2 border-b-1 border-b-zinc-200 px-5 pb-8 dark:border-b-zinc-700">
                    <h2 className="text-title font-title px-1 text-lg">Mais Repercutidos</h2>

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={6}
                        slidesPerView={"auto"}
                        className="max-w-lg:hidden w-full"
                    >
                        {reflectedPosts.map(({ _id, title, desc, upvotesCount, commentsCount }) => (
                            <SwiperSlide key={_id} className="!w-auto px-1 py-2">
                                <PostPreview
                                    title={title}
                                    desc={desc}
                                    upvotesCount={upvotesCount}
                                    commentsCount={commentsCount}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 pt-8 lg:grid-cols-[2fr_1fr]">
                    {feedLoading ? (
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

                            {feedHasNextPage && <div ref={ref}>carregando...</div>}
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
