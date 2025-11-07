import { motion } from "framer-motion";

import { useModal } from "@/contexts/ModalContext";
import { PostData } from "@/utils/types/postDataType";
import { IconX } from "@tabler/icons-react";
import { PostMap } from "../ui/PostMap";

type LocationOverlayProps = {
    post: PostData;
};

export const LocationModal = ({ post }: LocationOverlayProps) => {
    const { closeModal } = useModal();

    console.log(post.location);

    return (
        <>
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="bg-white dark:bg-zinc-900 h-fit w-full max-w-[97%] space-y-5 rounded-2xl p-6 px-4 lg:max-w-xl my-auto"
            >
                <header className="flex justify-between items-start">
                    <div>
                        <h3 className="text-title font-title mb-2 text-lg font-medium">Endereço</h3>

                        <p className="border-l-2 border-zinc-400/70 pl-2 text-sm text-zinc-800 dark:border-zinc-700/70 dark:text-zinc-200">
                            {post?.address}
                        </p>
                    </div>

                    <span
                        className="ml-auto cursor-pointer rounded-full bg-zinc-200 p-2 dark:bg-zinc-800"
                        onClick={closeModal}
                    >
                        <IconX className="text-subtitle size-4" />
                    </span>
                </header>

                <main>
                    <h3 className="text-title font-title mb-2 text-lg font-medium">Localização</h3>

                    {post?.location?.latitude != null && post?.location?.longitude != null && (
                        <PostMap
                            latitude={Number(post.location.latitude)}
                            longitude={Number(post.location.longitude)}
                        />
                    )}
                </main>
            </motion.div>
        </>
    );
};
