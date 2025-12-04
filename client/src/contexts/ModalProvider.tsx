import { NotificationModal } from "@/components/features/notification/NotificationModal";
import { LocationModal } from "@/components/features/post/LocationModal";
import { PostModal } from "@/components/features/post/PostModal";
import { PostShareModal } from "@/components/features/post/PostShareModal";
import { ReportModal } from "@/components/features/report/ReportModal";
import { SearchModal } from "@/components/features/search/SearchModal";
import { SettingsModal } from "@/components/features/settings/SettingsModal";
import { ChangePasswordModal } from "@/components/features/settings/components/ChangePasswordModal";
import { EditProfileModal } from "@/components/features/settings/components/EditProfileModal";
import { ImageModal } from "@/components/modal/ImageModal";
import { UploadImageModal } from "@/components/modal/UploadImageModal";
import { UpdateReportStatusModal } from "@/components/features/report/UpdateReportStatusModal";
import { IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { ModalContext, ModalContextType, useModal } from "./ModalContext";

export const Modals = {
    report: ReportModal,
    image: ImageModal,
    notification: NotificationModal,
    post: PostModal,
    postShare: PostShareModal,
    search: SearchModal,
    location: LocationModal,
    settings: SettingsModal,
    uploadImage: UploadImageModal,
    changePassword: ChangePasswordModal,
    editProfile: EditProfileModal,
    updateReportStatus: UpdateReportStatusModal,
};

type OpenModalType = {
    key: keyof typeof Modals;
    props: Record<string, any>;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [openModals, setOpenModals] = useState<OpenModalType[]>([]);
    const [modalKey, setModalKey] = useState<ModalContextType["modalKey"]>();

    const openModal: ModalContextType["openModal"] = (modalKey, props) => {
        setModalKey(modalKey);
        setOpenModals((prev) => [...prev, { key: modalKey as keyof typeof Modals, props }]);
    };

    const closeModal = () => {
        setModalKey(undefined);
        setOpenModals((prev) => prev.filter((_, index) => index !== openModals.length - 1));
    };

    return (
        <ModalContext.Provider
            value={{ openModal, closeModal, modalOpen: openModals.length > 0, modalKey }}
        >
            <AnimatePresence>
                {openModals.length > 0 &&
                    openModals.map(({ key, props }, index) => {
                        const Modal = Modals[key];
                        return (
                            <motion.div
                                key={`${key}-${index}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed top-0 left-0 z-[201] flex h-full w-full justify-center gap-2 bg-black/20 lg:px-3 lg:py-4 dark:bg-black/30"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) {
                                        closeModal();
                                    }
                                }}
                            >
                                <Modal {...(props as any)} zIndex={200 + index} closeModal={closeModal} />
                            </motion.div>
                        );
                    })}
                
            </AnimatePresence>
            {children}
        </ModalContext.Provider>
    );
};

ModalProvider.Close = function ModalClose() {
    const { closeModal } = useModal();
    return (
        <button
            className="ml-auto cursor-pointer rounded-xl ring-1 ring-zinc-200 p-2 dark:ring-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            onClick={closeModal}
        >
            <IconX className="text-subtitle size-5" />
        </button>
    );
};
