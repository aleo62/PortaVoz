import { useIsMobile } from "@/hooks/useIsMobile";
import { PostData } from "@/utils/types/postDataType";
import { InvalidateQueryFilters, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { LocationModal } from "../modal/LocationModal";
import { PostModal } from "../modal/PostModal";
import { HeaderPost } from "./HeaderPost";
import { MainPost } from "./MainPost";
import { PostMap } from "./PostMap";

export const Post = ({ post }: { post: PostData }) => {
    const isMobile = useIsMobile();
    const queryClient = new QueryClient();

    const [optionsDropOpen, setOptionsDropOpen] = useState(false);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);

    useEffect(() => {
        if (!isOverlayOpen) {
            queryClient.invalidateQueries(["comments", post._id] as InvalidateQueryFilters);
        }
    }, [isOverlayOpen, post._id]);

    return (
        <>
            <PostModal isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)} post={post} />

            {isMobile && locationOpen && (
                <LocationModal
                    isOpen={locationOpen}
                    onClose={() => setLocationOpen(false)}
                    post={post}
                />
            )}

            <article
                className={`relative w-full max-w-[620px] rounded-2xl bg-white pb-6 shadow-[0px_4px_10px_-19px_rgba(0,_0,_0,_0.1)] transition-all max-lg:pb-4 ${!isMobile && locationOpen && "translate-x-[-50%]"} dark:bg-zinc-900`}
            >
                <HeaderPost
                    post={post}
                    optionsDropOpen={optionsDropOpen}
                    setOptionsDropOpen={setOptionsDropOpen}
                />

                <MainPost
                    post={post}
                    setIsOverlayOpen={setIsOverlayOpen}
                    setLocationOpen={setLocationOpen}
                />

                {!isMobile && (
                    <div
                        className={`${locationOpen ? "left-[140%] opacity-100" : "left-1/2 opacity-0"} absolute top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-5 transition-all lg:max-w-md`}
                    >
                        <h3 className="text-title font-title mb-2 text-lg font-medium">Endereço</h3>

                        <p className="border-l-2 border-zinc-200 pl-2 text-sm text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
                            {post?.address}
                        </p>

                        <h3 className="text-title font-title mb-2 text-lg font-medium">
                            Localização
                        </h3>

                        {!isMobile && locationOpen && post.location && (
                            <PostMap
                                latitude={Number(post.location.latitude)}
                                longitude={Number(post.location.longitude)}
                            />
                        )}
                    </div>
                )}
            </article>
        </>
    );
};
