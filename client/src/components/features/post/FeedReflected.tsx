import { usePosts } from "@/hooks/posts/usePosts";
import { PostData } from "@/utils/types/postDataType";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostReflected } from "./PostReflected";
import { PostReflectedSkeleton } from "./PostReflectedSkeleton";

export const FeedReflected = () => {
    const { data: reflectedData, isLoading: reflectedLoading } = usePosts({ vote: "desc" }, true);

    const reflectedPosts: PostData[] =
        (reflectedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    return (
        <section className="sticky top-21 hidden h-fit w-fit gap-3 space-y-1 rounded-2xl pb-4 bg-white dark:bg-zinc-900 py-1  lg:block">
            <h2 className="text-title xxl:px-4 mb-3 px-3 py-3 text-lg font-medium">
                Repercutidos
            </h2>

            {reflectedLoading && <PostReflectedSkeleton />}

            {!reflectedLoading && !reflectedPosts.length && (
                <div className="mx-auto my-8 text-center text-zinc-500">
                    <p className="text-base italic">Nada por aqui também 💤</p>
                </div>
            )}

            {!reflectedLoading && reflectedPosts.length > 0 && (
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView="auto"
                    className="animate-fade-in xxl:!px-4 !w-fit !px-3"
                    direction={"vertical"}
                >
                    {reflectedPosts.map((post) => (
                        <SwiperSlide key={post._id} className="!w-fit">
                            <PostReflected post={post} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};
