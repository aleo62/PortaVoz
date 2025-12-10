import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { useCreateCommunity } from "@/hooks/community/useCreateCommunity";
import { IconPhoto, IconUpload } from "@tabler/icons-react";
import { useMemo, useState } from "react";

export const CreateCommunityModal = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [banner, setBanner] = useState<File | null>(null);
    const { mutate: createCommunity, isPending } = useCreateCommunity();
    const { closeModal, openModal } = useModal();

    const bannerUrl = useMemo(() => (banner ? URL.createObjectURL(banner) : null), [banner]);
    const imageUrl = useMemo(() => (image ? URL.createObjectURL(image) : null), [image]);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        if (image) formData.append("image", image);
        if (banner) formData.append("banner", banner);

        console.log(image)
        console.log(banner)

        createCommunity(formData, {
            onSuccess: () => {
                closeModal();
            },
        });
    
    };
    const handleBannerClick = () => {
        openModal("uploadImage", {
            title: "Enviar Banner",
            aspect: 3 / 1,
            onUpload: (file: File) => setBanner(file),
        });
    };

    const handleImageClick = () => {
        openModal("uploadImage", {
            title: "Enviar Ícone",
            aspect: 1,
            onUpload: (file: File) => setImage(file),
        });
    };

    return (
        <div
            className="my-auto flex h-fit w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
                <h2 className="text-xl text-title font-title">
                    Criar Comunidade
                </h2>
                <ModalProvider.Close />
            </div>

            <div className="flex flex-col gap-6 p-6">
                <div
                    className="relative flex h-32 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                    onClick={handleBannerClick}
                >
                    {banner ? (
                        <img
                            src={bannerUrl!}
                            alt="Banner preview"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-zinc-500">
                            <IconPhoto size={24} />
                            <span className="text-sm font-medium">Enviar Banner</span>
                        </div>
                    )}
                </div>

                <div className="mt-16 ml-4">
                    <div
                        className="relative flex h-24 w-24 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-zinc-100 shadow-sm transition-colors hover:bg-zinc-200 dark:border-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                        onClick={handleImageClick}
                    >
                        {image ? (
                            <img
                                src={imageUrl!}
                                alt="Icon preview"
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <IconUpload className="text-zinc-500" size={24} />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Nome da Comunidade"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Textarea
                        placeholder="Sobre o que é esta comunidade?"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setDescription(e.target.value)
                        }
                        rows={4}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-zinc-200 p-4 dark:border-zinc-800">
                <Button text="Cancelar" styleType="outlined" onClick={closeModal} />
                <Button text="Criar" onClick={handleSubmit} isLoading={isPending} />
            </div>
        </div>
    );
}
