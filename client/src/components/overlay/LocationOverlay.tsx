import { motion } from "framer-motion";

import { PostData } from "@/utils/types/postDataType";
import { OverlayTemplate, OverlayTemplateProps } from "../templates/OverlayTemplate";
import { MapView } from "../ui/MapView";

type LocationOverlayProps = OverlayTemplateProps & {
    post: PostData;
};

export const LocationOverlay = ({ isOpen, onClose, post }: LocationOverlayProps) => {
    return (
        <>
            <OverlayTemplate isOpen={isOpen} onClose={onClose}>
                <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="bg-body-background h-fit w-full max-w-xl rounded-xl p-5 space-y-5"
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
                            <MapView
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
