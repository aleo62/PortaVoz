import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/Button";
import { useModal } from "@/contexts/ModalContext";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useStoreUser } from "@/stores/userStore";
import { IconCamera, IconPencil } from "@tabler/icons-react";
import { SaveConfirmationBar } from "../components/SaveConfirmationBar";
import { SettingsBlock } from "../components/SettingsBlock";

export const ProfileSettings = () => {
    const { user } = useStoreUser();
    const { openModal } = useModal();
    const { mutate: updateUser, isPending } = useUpdateUser();

    const [stagedData, setStagedData] = useState<{
        fName: string;
        lName: string;
        username: string;
        about: string;
    } | null>(null);

    const [stagedImages, setStagedImages] = useState<{
        image?: { file: File; preview: string };
        banner?: { file: File; preview: string };
    }>({});

    const hasChanges = !!stagedData || Object.keys(stagedImages).length > 0;

    const handleEditProfile = () => {
        if (!user) return;
        openModal("editProfile", {
            initialData: stagedData || {
                fName: user.fName || "",
                lName: user.lName || "",
                username: user.username || "",
                about: user.about || "",
            },
            onConfirm: (data: any) => setStagedData(data),
        });
    };

    const handleImageUpload = (type: "image" | "banner", file: File) => {
        const preview = URL.createObjectURL(file);
        setStagedImages((prev) => ({ ...prev, [type]: { file, preview } }));
    };

    const handleSave = () => {
        if (!user) return;
        const data = new FormData();

        if (stagedData) {
            Object.entries(stagedData).forEach(([key, value]) => {
                data.append(key, value);
            });
        }

        if (stagedImages.image) data.append("image", stagedImages.image.file);
        if (stagedImages.banner) data.append("banner", stagedImages.banner.file);

        updateUser(
            { userData: data, userId: user._id },
            {
                onSuccess: () => {
                    toast.success("Perfil atualizado com sucesso!");
                    setStagedData(null);
                    setStagedImages({});
                },
                onError: () => toast.error("Erro ao atualizar perfil."),
            },
        );
    };

    const handleCancel = () => {
        setStagedData(null);
        setStagedImages({});
    };

    const displayData = stagedData || user;
    const bannerSrc = stagedImages.banner?.preview || user?.banner;
    const imageSrc = stagedImages.image?.preview || user?.image;

    return (
        <>
            <div className="relative mb-16">
                <figure className="relative h-40 w-full rounded-xl bg-zinc-300 shadow-sm dark:bg-zinc-800">
                    {bannerSrc && (
                        <img
                            src={bannerSrc}
                            alt="Banner"
                            className="h-full w-full rounded-xl object-cover"
                        />
                    )}
                    <button
                        className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                        onClick={() =>
                            openModal("uploadImage", {
                                title: "Alterar banner",
                                onUpload: (file: File) => handleImageUpload("banner", file),
                            })
                        }
                    >
                        <IconPencil className="h-5 w-5" />
                    </button>
                </figure>
                <div className="absolute -bottom-12 left-6">
                    <div className="relative">
                        <img
                            src={imageSrc}
                            alt="Foto de perfil"
                            className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-md dark:border-zinc-900"
                        />
                        <button
                            className="bg-primary-500 hover:bg-primary-600 absolute right-0 bottom-0 rounded-full p-1.5 text-white shadow-sm transition-colors"
                            onClick={() =>
                                openModal("uploadImage", {
                                    title: "Alterar foto de perfil",
                                    onUpload: (file: File) => handleImageUpload("image", file),
                                })
                            }
                        >
                            <IconCamera className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="absolute right-0 -bottom-10">
                    <Button text="Editar perfil" styleType="outlined" onClick={handleEditProfile} />
                </div>
            </div>

            <SettingsBlock
                title="Informações Pessoais"
                description="Suas informações visíveis para outros usuários."
            >
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Nome
                        </span>
                        <p className="text-zinc-900 dark:text-zinc-100">
                            {displayData?.fName} {displayData?.lName}
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Usuário
                        </span>
                        <p className="text-zinc-900 dark:text-zinc-100">
                            @{displayData?.username}
                        </p>
                    </div>
                    <div>
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Sobre
                        </span>
                        <p className="whitespace-pre-wrap text-zinc-900 dark:text-zinc-100">
                            {displayData?.about || "Nenhuma descrição definida."}
                        </p>
                    </div>
                </div>
            </SettingsBlock>

            {hasChanges && (
                <SaveConfirmationBar
                    onSave={handleSave}
                    onCancel={handleCancel}
                    isPending={isPending}
                />
            )}
        </>
    );
};
