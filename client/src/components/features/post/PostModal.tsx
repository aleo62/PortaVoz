import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { useComments } from "@/hooks/comments/useComments";
import { useCreateComment } from "@/hooks/comments/useCreateComment";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useStoreUser } from "@/stores/userStore";
import { CommentData } from "@/types/commentDataType";
import { PostData } from "@/types/postDataType";
import { formatDate } from "@/utils/functions/formatDate";
import { IconChevronDown, IconChevronUp, IconX } from "@tabler/icons-react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Comment } from "../comment/Comment";

type SearchOverlayProps = ModalDefaultProps & {
    post: PostData;
};

export const PostModal = ({ post, zIndex }: SearchOverlayProps) => {
    const isMobile = useIsMobile();
    const { user: userData } = useStoreUser();
    const { modalOpen, modalKey, closeModal } = useModal();

    const [contentHidden, setContentHidden] = useState(false);
    const [commentInput, setCommentInput] = useState("");

    const { data, isLoading, fetchNextPage, hasNextPage } = useComments(post._id, modalOpen && modalKey === "post");
    const comments: CommentData[] = data?.pages.flatMap((page) => page.comments) ?? [];

    const createComment = useCreateComment();
    const handleCreateComment = async (e: React.FormEvent) => {
        e.preventDefault();

        await createComment.mutate({
            content: commentInput,
            parentId: post._id,
        });
        setCommentInput("");
    };

    const deleteComment = useDeleteComment();
    const handleDeleteComment = async (id: string) => {
        await deleteComment.mutate(id);
    };

    const { ref, inView } = useInView({});
    useEffect(() => {
        if (inView && !isLoading && hasNextPage) fetchNextPage();
    }, [inView]);

    return (
        <>
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="bg-body-background h-full w-full max-w-xl rounded-xl max-lg:hidden"
                style={{ zIndex }}
            >
                <Swiper className="h-full">
                    {post.images.map((image) => (
                        <SwiperSlide>
                            <img
                                className={`max-h-xl h-full w-full max-w-xl object-cover transition-all duration-300 ease-in-out`}
                                src={image as string}
                                alt="Representação da Cena"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            <motion.div
                initial={isMobile && { transform: "translateY(50px)" }}
                animate={isMobile && { transform: "translateY(0px)" }}
                exit={isMobile ? { transform: "translateY(50px)" } : {}}
                transition={{ duration: 0.2 }}
                className={`text-title relative flex bg-white dark:bg-zinc-900 ${isMobile ? "mt-auto h-[90%]" : "h-full"} w-full flex-col rounded-t-xl p-4 py-7 lg:max-w-md lg:rounded-b-xl xl:max-w-lg`}
                style={{ zIndex }}
            >
                <header className="flex items-center gap-2">
                    <img
                        src={post.user.image}
                        className="h-11 w-11 rounded-full object-cover"
                        alt=""
                    />
                    <div className="leading-4">
                        <h3 className="text-md font-title font-medium">{post.user.username}</h3>
                        <p className="text-subtitle text-sm">{formatDate(post.createdAt)}</p>
                    </div>

                    <span
                        className="ml-auto cursor-pointer rounded-full bg-zinc-200/60 p-2 hover:bg-zinc-200 dark:bg-zinc-800/60 hover:dark:bg-zinc-800"
                        onClick={closeModal}
                    >
                        <IconX className="text-subtitle size-4" />
                    </span>
                </header>

                <main
                    className={`mt-7 ${contentHidden ? "max-h-0" : "max-h-[500px]"} ease overflow-hidden transition-all`}
                >
                    <h1 className="font-title text-xl font-medium">{post.title}</h1>
                    <p className="text-subtitle mt-3 mb-7 text-sm">{post.desc}</p>
                </main>
                <div className="flex flex-1 flex-col overflow-hidden">
                    <h3 className="mb-3 flex items-center justify-between gap-2 text-sm dark:text-zinc-500">
                        <p>Comentários</p>
                        <button
                            className="text-accent flex items-center text-xs"
                            onClick={() => setContentHidden((prev) => !prev)}
                        >
                            {contentHidden ? (
                                <>
                                    <IconChevronDown className="size-4" /> Mostrar
                                </>
                            ) : (
                                <>
                                    <IconChevronUp className="size-4" /> Ocultar
                                </>
                            )}{" "}
                            Descrição
                        </button>
                    </h3>

                    {comments.length <= 0 && (
                        <div className="text-subtitle mx-auto text-xs">Nenhum comentário</div>
                    )}
                    <div className="scrollbar-thin scrollbar-track-[#fafafa] dark:scrollbar-track-[#212121] scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 mt-3 flex-1 space-y-2 overflow-y-auto">
                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                onDeleteComment={() => handleDeleteComment(comment._id)}
                            />
                        ))}
                        {hasNextPage && <div ref={ref}>carregando...</div>}
                    </div>
                </div>

                <form
                    className="mt-2 flex items-center gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-700"
                    onSubmit={(e) => handleCreateComment(e)}
                >
                    <img
                        src={userData?.image as string}
                        alt=""
                        className="h-10 w-10 rounded-full"
                    />

                    <input
                        type="text"
                        placeholder="Adicione um comentário"
                        className="focus:ring-accent text-title h-10 w-full rounded-lg px-3 text-sm font-medium ring-1 ring-zinc-200 transition-all duration-300 outline-none focus:ring-2 dark:ring-zinc-700"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                </form>
            </motion.div>
        </>
    );
};
