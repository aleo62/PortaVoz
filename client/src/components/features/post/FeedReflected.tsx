import { usePosts } from "@/hooks/posts/usePosts";
import { PostData } from "@/types/postDataType";
import { IconDotsVertical } from "@tabler/icons-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostReflected } from "./PostReflected";
import { PostReflectedSkeleton } from "./PostReflectedSkeleton";

export const FeedReflected = () => {
    const { data: reflectedData, isLoading: reflectedLoading } = usePosts({ vote: "desc" }, true);

    const reflectedPosts: PostData[] =
        (reflectedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    return (
        <section className="sticky w-full max-w-85 hidden h-fit gap-3 space-y-1 rounded-2xl lg:block ">
            <div className="xxl:px-4 mb-3 flex items-center justify-between px-3 py-4">
                <h2 className="text-title text-lg">Repercutidos</h2>
                <IconDotsVertical className="mr-2 size-4" />
            </div>

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
                    className="animate-fade-in xxl:!px-4 !px-3"
                    direction={"vertical"}
                >
                    {reflectedPosts.map((post) => (
                        <SwiperSlide key={post._id} className="">
                            <PostReflected post={post} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
};
