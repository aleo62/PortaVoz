import { usePosts } from "@/hooks/posts/usePosts";
import { PostData } from "@/types/postDataType";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostReflected } from "./PostReflected";
import { PostReflectedSkeleton } from "./PostReflectedSkeleton";

export const FeedReflected = () => {
    const { data: reflectedData, isLoading: reflectedLoading } = usePosts({ vote: "desc" }, true);

    const reflectedPosts: PostData[] =
        (reflectedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    return (
        <section className="h-fit w-full space-y-5 rounded-2xl">
            <h2 className="font-title text-title tracking-wide">Repercutidos</h2>

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
                    slidesPerView={"auto"}
                    className="!h-fit !w-full"
                    direction="vertical"
                >
                    {reflectedPosts.map((post) => (
                        <SwiperSlide key={post._id} className="!w-full">
                            <PostReflected post={post} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};
