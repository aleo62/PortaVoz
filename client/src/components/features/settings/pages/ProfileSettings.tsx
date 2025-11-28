import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { useModal } from "@/contexts/ModalContext";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useStoreUser } from "@/stores/userStore";
import { IconCamera, IconPencil } from "@tabler/icons-react";
import { SettingsBlock } from "../components/SettingsBlock";

export const ProfileSettings = () => {
    const { user } = useStoreUser();
    const { openModal } = useModal();
    const { mutate: updateUser, isPending } = useUpdateUser();

    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        username: "",
        about: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fName: user.fName || "",
                lName: user.lName || "",
                username: user.username || "",
                about: user.about || "",
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (!user) return;
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        updateUser(
            { userData: data, userId: user._id },
            {
                onSuccess: () => toast.success("Perfil atualizado com sucesso!"),
                onError: () => toast.error("Erro ao atualizar perfil."),
            },
        );
    };

    const handleImageUpload = (type: "image" | "banner", file: File) => {
        if (!user) return;
        const data = new FormData();
        data.append(type, file);

        updateUser(
            { userData: data, userId: user._id },
            {
                onSuccess: () =>
                    toast.success(
                        `${type === "image" ? "Foto" : "Banner"} atualizada com sucesso!`,
                    ),
                onError: () => toast.error("Erro ao atualizar imagem."),
            },
        );
    };

    return (
        <>
            <div className="relative mb-16">
                <figure className="relative h-40 w-full rounded-xl bg-zinc-300 shadow-sm dark:bg-zinc-800">
                    {user?.banner && (
                        <img
                            src={user.banner}
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
                            src={user?.image}
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
            </div>

            <SettingsBlock
                title="Informações Pessoais"
                description="Atualize suas informações básicas."
            >
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormInput
                        label="Nome"
                        inputProps={{
                            name: "fName",
                            value: formData.fName,
                            onChange: handleChange,
                            placeholder: "Seu nome",
                        }}
                    />
                    <FormInput
                        label="Sobrenome"
                        inputProps={{
                            name: "lName",
                            value: formData.lName,
                            onChange: handleChange,
                            placeholder: "Seu sobrenome",
                        }}
                    />
                    <div className="md:col-span-2">
                        <FormInput
                            label="Nome de usuário"
                            inputProps={{
                                name: "username",
                                value: formData.username,
                                onChange: handleChange,
                                placeholder: "@usuario",
                            }}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <FormInput
                            label="Sobre"
                            textArea
                            textAreaProps={{
                                name: "about",
                                value: formData.about,
                                onChange: handleChange,
                                rows: 4,
                                placeholder: "Conte um pouco sobre você...",
                            }}
                            maxLength={160}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <Button
                        text={isPending ? "Salvando..." : "Salvar alterações"}
                        onClick={handleSave}
                        disabled={isPending}
                    />
                </div>
            </SettingsBlock>
        </>
    );
};
