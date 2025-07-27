import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useUser } from "@/contexts/UserContext";
import { usePostById } from "@/hooks/posts/usePostById";
import { CommentData } from "@/utils/types/commentDataType";
import { PostData } from "@/utils/types/postDataType";
import { IconX } from "@tabler/icons-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Comment } from "./Comment";
import { useCreateComment } from "@/hooks/comments/useCreateComment";

type SearchOverlayProps = {
    isOpen: boolean;
    onClose: () => void;
    report: PostData;
};

export const PostOverlay = ({ isOpen, onClose, report }: SearchOverlayProps) => {
    const { userData } = useUser();
    const { data } = usePostById(report._id, isOpen);

    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState<CommentData[]>([]);

    const createComment = useCreateComment();

    useEffect(() => {
        if (data) {
            setComments(data.post.comments);
        }
    }, [data?.post.comments]);

    useEffect(() => {
        if (isOpen) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.overflow = "hidden";
            document.documentElement.style.paddingRight = `${scrollBarWidth}px`;

            const header = document.querySelector("header") as HTMLElement;
            if (header) {
                header.style.paddingRight = `${scrollBarWidth}px`;
            }
        }
    }, [isOpen]);

    const handleCreateComment = async (e: React.FormEvent) => {
        e.preventDefault();

        
        const response = await createComment.mutate({ content: commentInput, parentId: report._id });
        console.log(response);
        
        setComments([
            ...comments,
            {
                _id: "sdfsdfsdf",
                parentId: report._id,
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
        ]);
    };

    const resetScrollLock = () => {
        document.documentElement.style.overflow = "";
        document.documentElement.style.paddingRight = "";

        const header = document.querySelector("header") as HTMLElement;
        if (header) {
            header.style.paddingRight = "";
        }
    };

    return (
        <AnimatePresence onExitComplete={resetScrollLock}>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center gap-2 bg-black/50 px-3 py-10 backdrop-blur-xl"
                >
                    <IconX
                        onClick={onClose}
                        className="absolute top-3 right-3 cursor-pointer text-zinc-500 dark:text-white"
                        style={{ zIndex: "100" }}
                    />

                    {/* LEFT SIDE ---------------> */}
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="bg-body-background h-full w-full max-w-2xl rounded-xl"
                    >
                        <Swiper className="h-full">
                            {report.images.map((image) => (
                                <SwiperSlide>
                                    <img
                                        className={`h-full w-full object-cover transition-all duration-300 ease-in-out`}
                                        src={image as string}
                                        alt="Representação da Cena"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </motion.div>

                    {/* RIGHT SIDE ---------------> */}
                    <div className="bg-body-background text-title flex h-full w-full max-w-md flex-col rounded-xl p-4 py-7">
                        {/* HEADER */}
                        <header className="flex items-center gap-2">
                            <img src={report.userPhoto} className="h-11 w-11 rounded-full" alt="" />
                            <div className="leading-4">
                                <h3 className="text-md font-title font-medium">
                                    {report.userName}
                                </h3>
                                <p className="text-subtitle text-sm">{report._id}</p>
                            </div>
                        </header>

                        {/* CONTENT */}
                        <main className="mt-5">
                            <h1 className="font-title text-xl font-semibold">{report.title}</h1>
                            <p className="text-subtitle mt-2 mb-5 text-sm">{report.desc}</p>
                        </main>

                        {/* COMMENTS */}
                        <div>
                            <h2 className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-500">
                                <p>Comentários</p>
                                <span className="h-[1px] flex-1 rounded-full bg-zinc-400 dark:bg-zinc-500"></span>
                            </h2>

                            <div className="mt-3">
                                {comments.map((comment: CommentData) => (
                                    <Comment comment={comment} key={comment._id} />
                                ))}
                            </div>
                        </div>

                        {/* INPUT */}
                        <form
                            className="mt-auto flex items-center gap-3 border-t border-zinc-200 p-2 pt-4 dark:border-zinc-700"
                            onSubmit={(e) => handleCreateComment(e)}
                        >
                            <img src={userData?.image} alt="" className="h-10 w-10 rounded-full" />
                            <input
                                type="text"
                                placeholder="Adicione um comentário"
                                className="focus:ring-accent h-10 w-full rounded-lg px-3 text-sm ring-1 ring-zinc-200 transition-all duration-300 outline-none focus:ring-2 dark:ring-zinc-700"
                                onChange={(e) => setCommentInput(e.target.value)}
                            />
                        </form>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
