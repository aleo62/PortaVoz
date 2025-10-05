import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { Post } from "@/components/ui/Post";
import { PostReflectedSkeleton } from "@/components/ui/PostReflectedSkeleton";
import { PostReflected } from "@/components/ui/PostReflected";
import { PostSkeleton } from "@/components/ui/PostSkeleton";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useIsMobile } from "@/hooks/useIsMobile";
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
    } = usePosts({ date: "desc" }, true);
    const {
        data: reflectedData,
        isLoading: reflectedLoading,
        // fetchNextPage: fetchReflectedNextPage,
        // hasNextPage: reflectedHasNextPage,
    } = usePosts({ vote: "desc" }, true);

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
            <div className="h-fit w-full pb-5">
                {!useIsMobile() && <HeaderSidebar />}
                <div className="mx-auto w-full max-w-6xl gap-3 space-y-1 border-b-1 border-b-zinc-200 pb-10 lg:px-5 dark:border-b-zinc-700">
                    <h2 className="text-title font-title text-md font-medium">Repercutidos</h2>

                    {reflectedLoading ? (
                        <div className="w-auto px-1 py-2">
                            <PostReflectedSkeleton />
                        </div>
                    ) : (
                        <>
                            {!reflectedPosts.length ? (
                                <div className="mx-auto my-6 text-center text-zinc-500">
                                    <p className="text-md">Nada por aqui também</p>
                                </div>
                            ) : (
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={6}
                                    slidesPerView={"auto"}
                                    className="w-full"
                                >
                                    {reflectedPosts.map(
                                        ({
                                            _id,
                                            title,
                                            desc,
                                            images,
                                            upvotesCount,
                                            commentsCount,
                                        }) => (
                                            <SwiperSlide key={_id} className="!w-auto py-2">
                                                <PostReflected
                                                    title={title}
                                                    desc={desc}
                                                    images={images}
                                                    upvotesCount={upvotesCount}
                                                    commentsCount={commentsCount}
                                                />
                                            </SwiperSlide>
                                        ),
                                    )}
                                </Swiper>
                            )}
                        </>
                    )}
                </div>

                <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 pt-10 lg:px-6">
                    {feedLoading ? (
                        <PostSkeleton />
                    ) : (
                        <>
                            {!posts.length ? (
                                <div className="mx-auto text-center text-zinc-500">
                                    <p className="text-lg">Nenhuma Denúncia enviada ainda</p>
                                    <p className="mt-3 text-5xl">;(</p>
                                </div>
                            ) : (
                                <section className="flex w-full flex-col items-center space-y-3">
                                    {posts.map((post: PostData) => (
                                        <Post
                                            post={post}
                                            onDeletePost={async () =>
                                                await hadleDeletePost(post._id)
                                            }
                                            key={post._id}
                                        />
                                    ))}

                                    {feedHasNextPage && <div ref={ref}>carregando...</div>}
                                </section>
                            )}
                        </>
                    )}
                </div>
            </div>

            <button
                className="bg-accent fixed right-10 bottom-10 z-100 flex h-12 w-12 items-center justify-center rounded-full text-white"
                onClick={() => navigate("/create-post")}
            >
                <IconPlus size={25} />
            </button>
        </>
    );
};
