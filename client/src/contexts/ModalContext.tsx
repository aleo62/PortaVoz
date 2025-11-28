import { AnimatePresence, motion } from "framer-motion";
import { createContext, lazy, ReactNode, Suspense, useContext, useState } from "react";

const NotificationModal = lazy(() =>
    import("@/components/features/notification/NotificationModal").then((m) => ({
        default: m.NotificationModal,
    })),
);
const LocationModal = lazy(() =>
    import("@/components/features/post/LocationModal").then((m) => ({ default: m.LocationModal })),
);
const PostModal = lazy(() =>
    import("@/components/features/post/PostModal").then((m) => ({ default: m.PostModal })),
);
const PostShareModal = lazy(() =>
    import("@/components/features/post/PostShareModal").then((m) => ({
        default: m.PostShareModal,
    })),
);
const ReportModal = lazy(() =>
    import("@/components/features/report/ReportModal").then((m) => ({ default: m.ReportModal })),
);
const SearchModal = lazy(() =>
    import("@/components/features/search/SearchModal").then((m) => ({ default: m.SearchModal })),
);
const ChangePasswordModal = lazy(() =>
    import("@/components/features/settings/components/ChangePasswordModal").then((m) => ({
        default: m.ChangePasswordModal,
    })),
);
const SettingsModal = lazy(() =>
    import("@/components/features/settings/SettingsModal").then((m) => ({
        default: m.SettingsModal,
    })),
);
const ImageModal = lazy(() =>
    import("@/components/modal/ImageModal").then((m) => ({ default: m.ImageModal })),
);
const UploadImageModal = lazy(() =>
    import("@/components/modal/UploadImageModal").then((m) => ({ default: m.UploadImageModal })),
);

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
};

export type ModalContextType = {
    closeModal: () => void;
    modalKey: keyof typeof Modals | undefined;
    openModal: (modalKey: keyof typeof Modals, props: Record<string, any>) => void;
    modalOpen: boolean;
};

export type ModalDefaultProps = {
    zIndex?: number;
    closeModal: () => void;
};

type OpenModalType = {
    key: keyof typeof Modals;
    props: Record<string, any>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [openModals, setOpenModals] = useState<OpenModalType[]>([]);
    const [modalKey, setModalKey] = useState<ModalContextType["modalKey"]>();

    const openModal: ModalContextType["openModal"] = (modalKey, props) => {
        setModalKey(modalKey);
        setOpenModals((prev) => [...prev, { key: modalKey, props }]);
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
                                className="fixed top-0 left-0 z-[201] flex h-full w-full justify-center gap-2 bg-gradient-to-b from-transparent to-black/20 lg:px-3 lg:py-5 dark:to-white/10"
                                onClick={(e) => {
                                    if (e.target === e.currentTarget) {
                                        closeModal();
                                    }
                                }}
                            >
                                <Suspense fallback={null}>
                                    <Modal
                                        {...(props as any)}
                                        zIndex={200 + index}
                                        closeModal={closeModal}
                                    />
                                </Suspense>
                            </motion.div>
                        );
                    })}
            </AnimatePresence>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
