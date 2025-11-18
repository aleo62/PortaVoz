import { useModal } from "@/contexts/ModalContext";
import { IconX } from "@tabler/icons-react";
import { PostMap } from "./PostMap";

type PostLocationInfoProps = {
    address: string;
    longitude: number;
    latitude: number;
    isModal?: boolean;
};

export const PostLocationInfo = ({
    address,
    longitude,
    latitude,
    isModal,
}: PostLocationInfoProps) => {
    const { closeModal } = useModal();

    return (
        <>
            <header className="flex items-start justify-between">
                <div>
                    <h3 className="text-title font-title mb-2 text-lg font-medium">Endereço</h3>

                    <p className="border-l-2 border-zinc-400/70 pl-2 text-sm text-zinc-800 dark:border-zinc-700/70 dark:text-zinc-200">
                        {address}
                    </p>
                </div>

                {isModal && (
                    <span
                        className="ml-auto cursor-pointer rounded-full bg-zinc-200 p-2 dark:bg-zinc-800"
                        onClick={closeModal}
                    >
                        <IconX className="text-subtitle size-4" />
                    </span>
                )}
            </header>

            <main>
                <h3 className="text-title font-title mb-2 text-lg font-medium">Localização</h3>

                {latitude != null && longitude != null && (
                    <PostMap latitude={Number(latitude)} longitude={Number(longitude)} />
                )}
            </main>
        </>
    );
};
