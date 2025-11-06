import { motion } from "framer-motion";

import { PostData } from "@/utils/types/postDataType";
import { OverlayTemplate, OverlayTemplateProps } from "../templates/OverlayTemplate";
import { PostMap } from "../ui/PostMap";

type LocationOverlayProps = OverlayTemplateProps & {
    post: PostData;
};

export const LocationModal = ({ isOpen, onClose, post }: LocationOverlayProps) => {
    return (
        <>
            <OverlayTemplate isOpen={isOpen} onClose={onClose}>
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="bg-body-background h-fit w-full max-w-[97%] space-y-5 rounded-xl p-5 px-3 lg:max-w-xl"
                >
                    <div>
                        <h3 className="text-title font-title mb-2 text-lg font-medium">Endereço</h3>

                        <p className="border-l-2 border-zinc-700/70 pl-2 text-sm text-zinc-800 dark:text-zinc-200">
                            {post?.address}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-title font-title mb-2 text-lg font-medium">
                            Localização
                        </h3>

                        {post?.location?.latitude != null && post?.location?.longitude != null && (
                            <PostMap
                                latitude={Number(post.location.latitude)}
                                longitude={Number(post.location.longitude)}
                            />
                        )}
                    </div>
                </motion.div>
            </OverlayTemplate>
        </>
    );
};
