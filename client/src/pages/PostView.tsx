import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { MapView } from "@/components/ui/MapView";
import { usePostById } from "@/hooks/posts/usePostById";
import { IconArrowBigUp } from "@tabler/icons-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

export const Post = () => {
    const { postId } = useParams();
    const { data, isLoading, isError } = usePostById(postId!, true);
    const isUpvoted = data?.post?.isUpvoted;
    useEffect(() => {
        if (data?.post) console.log(data?.post?.location.longitude);
    }, [data]);

    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>Erro ao carregar post</div>;

    return (
        <>
            <div className="w-full">
                <HeaderSidebar />
                <article className="mx-auto w-full max-w-[570px] rounded-xl">
                    <header className="flex items-center gap-3 px-1 py-4">
                        <div
                            // onClick={() => navigate(`/profile/${post.userId}`)}
                            className="flex cursor-pointer items-center gap-3"
                        >
                            <img
                                src={data?.post?.userPhoto}
                                alt={data?.post?.userName}
                                className="h-10 w-10 rounded-full"
                            />

                            <div className="leading-4.5">
                                <p className="text-md text-title font-medium">
                                    {data?.post?.userName}
                                </p>
                                <p className="text-subtitle text-[.8rem]">{data?.post?.userId}</p>
                            </div>
                        </div>

                        {/* <div
                        className="relative ml-auto w-fit cursor-pointer"
                        onClick={() =>
                            optionsDropOpen ? setOptionsDropOpen(false) : setOptionsDropOpen(true)
                        }
                    >
                        <IconDotsVertical className="text-subtitle size-4" />
                        <PostDrop
                            isOpen={optionsDropOpen}
                            orientation="top"
                            onClose={() => {
                                setOptionsDropOpen(false);
                            }}
                            isOwner={
                                post.userId == userData?._publicId || !!userDecoded?.claims.admin
                            }
                            onDeletePost={onDeletePost}
                        />
                    </div> */}
                    </header>

                    <main>
                        <div className="h-90 w-full md:h-135">
                            <Swiper className="h-full">
                                {data?.post?.images.map((image: string) => (
                                    <SwiperSlide>
                                        <img
                                            className={`h-full w-full transition-all duration-300 ease-in-out`}
                                            // ${imageContain ? "object-contain" : "object-cover"}
                                            // onClick={() => setImageContain(!imageContain)}
                                            src={image}
                                            alt="Representação da Cena"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className="flex items-center space-x-1.5 py-3 font-semibold">
                            <div
                                className={`${isUpvoted ? "text-orange-500 dark:text-orange-300" : "text-subtitle"} flex cursor-pointer items-center justify-center gap-1 rounded-full rounded-l-full p-2 px-4 text-sm ring-1 ring-zinc-300 hover:bg-zinc-100 dark:ring-zinc-700 dark:hover:bg-zinc-800`}
                                // onClick={() => (isUpvoted ? deleteUpvote() : addUpvote())}
                            >
                                <IconArrowBigUp
                                    className={`${isUpvoted && "fill-orange-500 dark:fill-orange-300"} size-5`}
                                />
                                <p className="w-4 text-center">{data?.post?.upvotesCount}</p>
                            </div>
                        </div>

                        <div className="py-2">
                            <div className="mb-1 flex w-full items-center justify-between gap-2">
                                <h2 className="text-title font-title max-w-[90%] cursor-pointer truncate text-xl font-semibold wrap-break-word hover:underline lg:mb-2 lg:text-[1.5rem]">
                                    {data?.post?.title}
                                </h2>
                            </div>

                            <div>
                                <p className="mb-2 w-full text-sm wrap-break-word text-zinc-800 dark:text-zinc-300">
                                    {data?.post?.desc}
                                </p>
                            </div>

                            <div className="flex items-center gap-1 text-sm">
                                {data?.post?.hashtags.map((tag: string, key: number) => (
                                    <span key={key} className="text-accent before:content-['#']">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="py-3">
                            <h3 className="text-semibold text-title font-title text-xl">
                                Localização
                            </h3>

                            {data?.post?.location?.latitude != null &&
                                data?.post?.location?.longitude != null && (
                                    <MapView
                                        latitude={Number(data.post.location.latitude)}
                                        longitude={Number(data.post.location.longitude)}
                                    />
                                )}
                        </div>
                    </main>

                    <footer className="flex w-full items-center justify-end p-5">
                        {/* <a
                        onClick={() => navigate(`/post/${post._id}`)}
                        className="text-accent text-md flex items-center gap-1 font-medium underline"
                    >
                        Localização <IconMap size={20} />
                    </a> */}
                    </footer>
                </article>
            </div>
        </>
    );
};
