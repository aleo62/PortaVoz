import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { Post } from "@/components/ui/Post";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useIsMobile } from "@/utils/isMobile";
import loading from "@assets/images/loading.gif";
import { usePosts } from "@hooks/posts/usePosts";
import { IconArrowBigUp, IconMessageDots, IconPlus } from "@tabler/icons-react";
import { PostData } from "@utils/types/postDataType";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Posts = () => {
    const navigate = useNavigate();
    const deletePost = useDeletePost();

    const { data, isLoading, fetchNextPage, hasNextPage } = usePosts({});

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
                {!useIsMobile() && <HeaderSidebar />}
                <div className="mx-auto w-full max-w-6xl gap-3 space-y-2 pb-8 border-b-1 border-b-zinc-200 dark:border-b-zinc-700">
                    <h2 className="text-title font-title text-lg px-1">Mais Repercutidos</h2>

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={6}
                        slidesPerView={"auto"}
                        className="max-w-lg:hidden w-full"
                    >
                        {[1, 2, 3, 4].map((i) => (
                            <SwiperSlide key={i} className="!w-auto px-1 py-2">
                                <div className="flex h-35 items-center gap-2 rounded-xl bg-white p-2 ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-700">
                                    <div className="h-30 p-3">
                                        <h3 className="text-md text-title font-title font-medium">
                                            Skibid toilet é bom {i}
                                        </h3>
                                        <p className="text-subtitle max-w-45 text-xs">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        </p>

                                        <div className="text-subtitle mt-4 flex items-center gap-3 text-xs">
                                            <span className="flex items-center gap-1">
                                                <IconArrowBigUp className="size-4.5" /> 0
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <IconMessageDots className="size-4.5" /> 0
                                            </span>
                                        </div>
                                    </div>

                                    <img
                                        src="https://res.cloudinary.com/dzruwovge/image/upload/v1756208400/posts/bdhf9mrpae5skuagmvsy.png"
                                        className="h-30 w-30 rounded-xl object-cover"
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="grid w-full grid-cols-1 gap-5 pt-8 lg:grid-cols-[2fr_1fr]">
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
