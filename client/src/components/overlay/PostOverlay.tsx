import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useUser } from "@/contexts/UserContext";
import { useComments } from "@/hooks/comments/useComments";
import { useCreateComment } from "@/hooks/comments/useCreateComment";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { useIsMobile } from "@/utils/isMobile";
import { CommentData } from "@/utils/types/commentDataType";
import { PostData } from "@/utils/types/postDataType";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { OverlayTemplate, OverlayTemplateProps } from "../templates/OverlayTemplate";
import { Comment } from "../ui/Comment";

type SearchOverlayProps = OverlayTemplateProps & {
    post: PostData;
};

export const PostOverlay = ({ isOpen, onClose, post }: SearchOverlayProps) => {
    const isMobile = useIsMobile();

    const { userData } = useUser();
    const createComment = useCreateComment();

    const { data, isLoading, fetchNextPage, hasNextPage } = useComments(post._id);
    const [commentInput, setCommentInput] = useState("");

    let comments: CommentData[] = data?.pages.flatMap((page) => page.comments) ?? [];

    const handleCreateComment = async (e: React.FormEvent) => {
        e.preventDefault();

        await createComment.mutate({
            content: commentInput,
            parentId: post._id,
        });

        comments = [
            ...comments,
            {
                _id: "sdfsdfsdf",
                parentId: post._id,
                parentType: "Post",
                userId: userData?._publicId as string,
                userName: userData?.fName as string,
                userPhoto: userData?.image as string,
                content: commentInput,
                upvotesCount: 0,
                repliesCount: 0,
                replies: [],
                createdAt: new Date(),
                isUpvoted: false,
            },
        ];

        setCommentInput("");
    };
    // COMMENT MANAGEMENT
    const deleteComment = useDeleteComment();

    const handleDeleteComment = async (id: string) => {
        comments = comments.filter((comment) => comment._id !== id);
        await deleteComment.mutate(id);
    };

    const { ref, inView } = useInView({});

    useEffect(() => {
        if (inView && !isLoading && hasNextPage) {
            fetchNextPage();
        }
    }, [inView]);

    return (
        <>
            <OverlayTemplate isOpen={isOpen} onClose={onClose}>
                {/* LEFT SIDE ---------------> */}
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="bg-body-background h-full w-full max-w-xl rounded-xl max-lg:hidden"
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

                {/* RIGHT SIDE ---------------> */}
                <motion.div
                    initial={isMobile && { transform: "translateY(100px)" }}
                    animate={isMobile && { transform: "translateY(0px)" }}
                    exit={isMobile ? { transform: "translateY(20px)" } : {}}
                    transition={{ duration: 0.1 }}
                    className="bg-body-background text-title relative flex h-full w-full flex-col rounded-t-xl p-4 py-7 lg:max-w-md lg:rounded-b-xl"
                >
                    {/* HEADER */}
                    <header className="flex items-center gap-2">
                        <img src={post.userPhoto} className="h-11 w-11 rounded-full" alt="" />
                        <div className="leading-4">
                            <h3 className="text-md font-title font-medium">{post.userName}</h3>
                            <p className="text-subtitle text-sm">{post._id}</p>
                        </div>
                    </header>

                    {/* CONTENT */}
                    <main className="mt-7">
                        <h1 className="font-title text-xl font-semibold">{post.title}</h1>
                        <p className="text-subtitle mt-3 mb-7 text-sm">{post.desc}</p>
                    </main>

                    {/* COMMENTS */}
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <h2 className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-500">
                            <p>Comentários</p>
                            <span className="h-[1px] flex-1 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                        </h2>

                        <div className="scrollbar-thin scrollbar-track-[#fafafa] dark:scrollbar-track-[#212121] scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-700 mt-3 flex-1 overflow-y-auto">
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
                    {/* INPUT */}
                    <form
                        className="mt-2 flex items-center gap-3 border-t border-zinc-200 pt-2 dark:border-zinc-700"
                        onSubmit={(e) => handleCreateComment(e)}
                    >
                        <img src={userData?.image} alt="" className="h-10 w-10 rounded-full" />
                        <input
                            type="text"
                            placeholder="Adicione um comentário"
                            className="focus:ring-accent text-title h-10 w-full rounded-lg px-3 text-sm font-medium ring-1 ring-zinc-200 transition-all duration-300 outline-none focus:ring-2 dark:ring-zinc-700"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        />
                    </form>
                </motion.div>
            </OverlayTemplate>
        </>
    );
};
