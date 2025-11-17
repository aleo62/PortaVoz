import { usePosts } from "@/hooks/posts/usePosts";
import { PostData } from "@/utils/types/postDataType";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PostReflected } from "./PostReflected";
import { PostReflectedSkeleton } from "./PostReflectedSkeleton";
import { IconDotsVertical } from "@tabler/icons-react";

export const FeedReflected = () => {
    const { data: reflectedData, isLoading: reflectedLoading } = usePosts({ vote: "desc" }, true);

    const reflectedPosts: PostData[] =
        (reflectedData?.pages.flatMap((page) => page.posts) as PostData[]) || [];

    return (
        <section className="sticky top-10 hidden h-fit w-fit gap-3 space-y-1 rounded-2xl ring-1 ring-zinc-200 dark:ring-zinc-800  py-1 pb-4 shadow-[0px_4px_16px_-15px_rgba(0,_0,_0,_0.1)] lg:block">
            <div className="xxl:px-4 mb-3 px-3 py-4 flex items-center justify-between">
                <h2 className="text-title text-lg">Repercutidos</h2>
                <IconDotsVertical className="size-4 mr-2"/>
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
