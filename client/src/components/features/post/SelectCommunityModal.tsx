import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { IconPlus, IconTrash, IconUsers } from "@tabler/icons-react";
import { useState } from "react";

type SelectCommunityModalProps = {
    onConfirm: (data: { communityIds: string[]; visibility: "global" | "communities" | "both" }) => void;
    myCommunities: any[];
};

export const SelectCommunityModal = ({ onConfirm, myCommunities }: SelectCommunityModalProps) => {
    const { closeModal } = useModal();

    const [selectedCommunities, setSelectedCommunities] = useState<any[]>([]);
    const [postToFeed, setPostToFeed] = useState(true);
    const [showSelect, setShowSelect] = useState(false);

    const handleSelectCommunity = (communityId: string) => {
        const community = myCommunities.find((c: any) => c._id === communityId);
        if (community) {
            setSelectedCommunities([...selectedCommunities, community]);
            setShowSelect(false);
        }
    };

    const handleConfirm = () => {
        onConfirm({
            communityIds: selectedCommunities.map((c) => c._id),
            visibility: selectedCommunities.length > 0 && postToFeed ? "both" : selectedCommunities.length > 0 ? "communities" : "global",
        });
        closeModal();
    };

    return (
        <div
            className="my-auto flex h-fit w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
        >
            <header className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
                <h2 className="text-title font-title text-xl">Onde publicar?</h2>
                <ModalProvider.Close />
            </header>

            <div className="flex items-center justify-between rounded-xl border-b border-zinc-200 p-4 py-6 dark:border-zinc-800">
                <div className="flex flex-col">
                    <h3 className="font-title text-title">Feed Principal</h3>
                    <p className="text-subtitle text-sm">Sua publicação aparecerá para todos</p>
                </div>
                <Switch checked={postToFeed} onChange={setPostToFeed} />
            </div>

            <div className="flex flex-col gap-3 p-4 py-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-title font-title">Comunidades</h3>
                    {!showSelect && (
                        <button
                            onClick={() => setShowSelect(true)}
                            disabled={myCommunities.length === 0}
                            className="flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                            <IconPlus size={18} />
                            Adicionar Comunidade
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    {selectedCommunities.map((community) => (
                        <div
                            key={community._id}
                            className="flex items-center justify-between rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
                        >
                            <div className="flex items-center gap-3">
                                {community.image ? (
                                    <img
                                        src={community.image}
                                        alt={community.name}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                        <IconUsers size={16} />
                                    </div>
                                )}
                                <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                    {community.name}
                                </span>
                            </div>
                            <button
                                onClick={() =>
                                    setSelectedCommunities(
                                        selectedCommunities.filter((c) => c._id !== community._id),
                                    )
                                }
                                className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
                            >
                                <IconTrash size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {showSelect && (
                    <select
                        className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        onChange={(e) => handleSelectCommunity(e.target.value)}
                        defaultValue=""
                        autoFocus
                        onBlur={() => setShowSelect(false)}
                    >
                        <option value="" disabled>
                            Selecione uma comunidade...
                        </option>
                        {myCommunities.map((community: any) => (
                            <option key={community._id} value={community._id}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <footer className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
                <Button text="Cancelar" styleType="outlined" onClick={closeModal} />
                <Button text="Confirmar" onClick={handleConfirm} />
            </footer>
        </div>
    );
};
