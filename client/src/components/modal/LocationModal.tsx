import { motion } from "framer-motion";

import { PostData } from "@/types/postDataType";
import { PostLocationInfo } from "../features/post/PostLocationInfo";

type LocationOverlayProps = {
    post: PostData;
};

export const LocationModal = ({ post }: LocationOverlayProps) => {
    return (
        <>
            <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="bg-body-background my-auto h-fit w-full max-w-[97%] space-y-5 rounded-2xl p-6 px-4 lg:max-w-xl"
            >
                <PostLocationInfo
                    latitude={post.location.latitude}
                    longitude={post.location.longitude}
                    address={post.address}
                    isModal
                />
            </motion.div>
        </>
    );
};
