import { HeaderSidebar } from "@/components/sidebar/HeaderSidebar";
import { MapView } from "@/components/ui/MapView";
import { usePostById } from "@/hooks/posts/usePostById";
import { IconArrowBigUp, IconDotsVertical } from "@tabler/icons-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

export const Post = () => {
    const { postId } = useParams();
    const { data, isLoading, isError } = usePostById(postId!, true);
    const isUpvoted = data?.post?.isUpvoted;
    // const [optionsDropOpen, setOptionsDropOpen] = useState(false);
    // const deletePost = useDeletePost();

    useEffect(() => {
        if (data?.post) console.log(data?.post?.location.longitude);
    }, [data]);

    // const handleDeletePost = async (id: string) => {
    //     // @ts-ignore

    //     await deletePost.mutate(id);
    // };

    if (isLoading) return <div>Carregando...</div>;
    if (isError) return <div>Erro ao carregar post</div>;

    return (
        <>
            <div className="w-full">
                <HeaderSidebar />

                <article className="mx-auto flex w-full flex-col justify-center rounded-xl max-lg:items-center lg:flex-row lg:gap-4">
                    <div className="w-full max-w-[500px]">
                        <header className="flex items-center gap-3 px-1 py-4">
                            <div
                                // onClick={() => navigate(`/profile/${post.userId}`)}
                                className="flex cursor-pointer items-center gap-3"
                            >
                                <img
                                    src={data?.post?.userPhoto}
                                    alt={data?.post?.userName}
                                    className="h-10 w-10 rounded-full object-cover"
                                />

                                <div className="leading-4.5">
                                    <p className="text-md text-title font-medium">
                                        {data?.post?.userName}
                                    </p>
                                    <p className="text-subtitle text-[.8rem]">
                                        {data?.post?.userId}
                                    </p>
                                </div>
                            </div>

                            <div
                                className="relative ml-auto w-fit cursor-pointer"
                                // onClick={() =>
                                //     // optionsDropOpen
                                //     //     ? setOptionsDropOpen(false)
                                //     //     : setOptionsDropOpen(true)
                                // }
                            >
                                <IconDotsVertical className="text-subtitle size-4" />
                                {/* <PostDrop
                                    isOpen={optionsDropOpen}
                                    orientation="top"
                                    onClose={() => {
                                        setOptionsDropOpen(false);
                                    }}
                                    isOwner={
                                        post.userId == userData?._publicId ||
                                        !!userDecoded?.claims.admin
                                    }
                                    onDeletePost={() => handleDeletePost}
                                /> */}
                            </div>
                        </header>

                        <main>
                            <div className="h-90 w-full md:h-135">
                                <Swiper className="h-full">
                                    {data?.post?.images.map((image: string) => (
                                        <SwiperSlide>
                                            <img
                                                className={`h-full w-full transition-all duration-300 ease-in-out object-cover`}
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
                                        <span
                                            key={key}
                                            className="text-accent before:content-['#']"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </main>

                        <footer className="flex w-full items-center justify-end p-5"></footer>
                    </div>

                    <div className={`w-full space-y-5 transition-all lg:max-w-md`}>
                        <h3 className="text-title font-title mb-2 text-lg font-medium">Endereço</h3>

                        <p className="border-l-2 border-zinc-700/70 pl-2 text-sm text-zinc-800 dark:text-zinc-200">
                            {data?.post?.address}
                        </p>

                        <h3 className="text-title font-title mb-2 text-lg font-medium">
                            Localização
                        </h3>

                        {data?.post?.location.latitude != null &&
                            data?.post?.location.longitude != null && (
                                <MapView
                                    latitude={Number(data?.post?.location.latitude)}
                                    longitude={Number(data?.post?.location.longitude)}
                                />
                            )}
                    </div>
                </article>
            </div>
        </>
    );
};
