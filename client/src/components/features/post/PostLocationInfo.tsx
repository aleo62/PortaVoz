import { ModalProvider } from "@/contexts/ModalProvider";
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
    return (
        <>
            <header className="flex items-start justify-between mb-5">
                <div>
                    <h3 className="text-title font-title mb-2 text-lg">Endereço</h3>

                    <p className="border-l-2 border-zinc-400/70 pl-2 text-sm text-zinc-800 dark:border-zinc-700/70 dark:text-zinc-200">
                        {address}
                    </p>
                </div>

                {isModal && <ModalProvider.Close />}
            </header>

            <main>
                <h3 className="text-title font-title mb-2 text-lg">Localização</h3>

                {latitude != null && longitude != null && (
                    <PostMap latitude={Number(latitude)} longitude={Number(longitude)} />
                )}
            </main>
        </>
    );
};
