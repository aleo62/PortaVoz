import { UnsaveContainer } from "@/components/drop/UnsaveContainer";
import { InfoField } from "@/components/ui/InfoField";
import { Textarea } from "@/components/ui/Textarea";
import { UserData } from "@/utils/types/userDataType";

import { IconEdit, IconPencil } from "@tabler/icons-react";

import { useModal } from "@/contexts/ModalContext";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { useUserById } from "@/hooks/user/useUserById";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ModalEdit } from "./ModalEdit";

export type PreviewUser = UserData & {
    imageFile?: File;
    bannerFile?: File;
};

export const ViewProfile = () => {
    const { data: userData } = useUserById();
    const { mutateAsync: updateUser, isPending: isLoading } = useUpdateUser();
    const { openModal, closeModal } = useModal();

    const [editAbout, setEditAbout] = useState(true);
    const [unsave, setUnsave] = useState(false);
    const [previewUser, setPreviewUser] = useState<PreviewUser>();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileBannerRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (userData) {
            setPreviewUser(userData);
        }
    }, [userData]);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: "imageFile" | "bannerFile",
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUser((prev) =>
                prev
                    ? {
                          ...prev,
                          [key]: file,
                          [key === "imageFile" ? "image" : "banner"]: url,
                      }
                    : prev,
            );
            setUnsave(true);
        }
    };

    const handleAboutChange = (body: string) => {
        setPreviewUser((prev) => (prev ? { ...prev, about: body } : prev));
        setUnsave(true);
    };

    const handleUpdateUser = async () => {
        if (!previewUser) return;
        try {
            const formData = new FormData();

            if (previewUser.imageFile) formData.append("image", previewUser.imageFile);
            if (previewUser.bannerFile) formData.append("banner", previewUser.bannerFile);

            formData.append("username", previewUser.username);
            formData.append("fName", previewUser.fName);
            formData.append("lName", previewUser.lName);
            formData.append("about", previewUser.about!);

            await updateUser({ userData: formData, userId: userData._id });
        } catch (error) {
            setPreviewUser(userData);
        } finally {
            setUnsave(false);
            setEditAbout(true);
        }
    };

    const handleCancelUnsave = () => {
        if (userData) {
            setPreviewUser(userData);
        }
        setUnsave(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (fileBannerRef.current) fileBannerRef.current.value = "";
        cancelEditInfo();
        setEditAbout(true);
    };

    const saveEditInfo = () => {
        closeModal();

        if (
            userData?.fName === previewUser?.fName &&
            userData?.lName === previewUser?.lName &&
            userData?.username === previewUser?.username
        ) {
            setUnsave(false);
            return;
        }

        setUnsave(true);
    };

    const cancelEditInfo = () => {
        closeModal();

        if (userData) {
            setPreviewUser(userData);
        }
    };

    return (
        <>
            <UnsaveContainer
                isLoading={isLoading}
                isOpen={unsave}
                onCancel={handleCancelUnsave}
                onSave={handleUpdateUser}
            />

            <div
                className={`w-full max-w-4xl overflow-hidden rounded-2xl bg-white p-1 pb-10 shadow-[0px_4px_10px_-19px_rgba(0,_0,_0,_0.1)] lg:mx-0 dark:bg-zinc-900`}
            >
                <div className="relative">
                    <figure
                        className="group relative h-40 w-full cursor-pointer rounded-2xl bg-stone-300 md:h-60 dark:bg-zinc-800"
                        onClick={() => {
                            fileBannerRef.current?.click();
                        }}
                    >
                        {previewUser?.banner && (
                            <img
                                src={previewUser.banner as string}
                                alt="Banner"
                                className="absolute h-full w-full rounded-2xl object-cover"
                            />
                        )}

                        <div className="text-title absolute top-[10px] right-[10px] grid place-items-center rounded-full bg-white p-2 opacity-100 shadow-[0px_0px_60px_1px_rgba(0,0,0,0.1)] transition-[opacity] duration-200 group-hover:opacity-100 lg:opacity-0 dark:bg-zinc-900">
                            <IconPencil className="size-5 lg:size-8" />
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileBannerRef}
                            onChange={(e) => handleFileChange(e, "bannerFile")}
                        />
                    </figure>

                    <figure
                        className="group absolute bottom-0 left-1/2 h-30 w-30 -translate-x-1/2 cursor-pointer rounded-3xl ring-3 ring-white md:left-10 md:h-40 md:w-40 md:translate-x-0 lg:-bottom-2 dark:ring-zinc-900"
                        onClick={() => {
                            fileInputRef.current?.click();
                        }}
                    >
                        <div className="relative h-full w-full">
                            <img
                                src={previewUser?.image as string}
                                alt="Foto de perfil"
                                className="relative h-full w-full rounded-3xl object-cover"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={(e) => handleFileChange(e, "imageFile")}
                            />

                            <div className="text-title absolute bottom-[-10px] left-[-10px] grid place-items-center rounded-full bg-white p-2 opacity-100 shadow-[0px_0px_60px_1px_rgba(0,0,0,0.1)] transition-[opacity] duration-200 group-hover:opacity-100 lg:opacity-0 dark:bg-zinc-900">
                                <IconPencil className="size-5 lg:size-8" />
                            </div>
                        </div>
                    </figure>
                </div>

                <div className="mt-5 px-2 lg:px-6">
                    <div className="relative my-8 rounded-2xl p-5 py-6 ring-[.7px] ring-zinc-200 lg:p-6 lg:px-8 dark:ring-zinc-700">
                        <div className="text-title mb-2 flex h-10 items-center justify-between gap-2 text-xl font-bold">
                            <h2 className="font-title">Informações pessoais</h2>
                            <button
                                onClick={() =>
                                    openModal(
                                        <ModalEdit
                                            previewUser={previewUser!}
                                            setPreviewUser={
                                                setPreviewUser as Dispatch<
                                                    SetStateAction<PreviewUser>
                                                >
                                            }
                                            cancel={cancelEditInfo}
                                            save={saveEditInfo}
                                        />,
                                    )
                                }
                                className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold ring-[.7px] ring-zinc-300 transition-[background-color] duration-200 hover:bg-zinc-300/40 dark:ring-zinc-700"
                            >
                                <IconEdit /> Editar
                            </button>
                        </div>
                        <dl className="grid grid-cols-1 gap-4 py-5 text-sm md:text-[1rem] lg:grid-cols-3">
                            <InfoField
                                topic="Nome Inteiro"
                                info={`${previewUser?.fName} ${previewUser?.lName}`}
                            />
                            <InfoField topic="Username" info={previewUser?.username!} />
                        </dl>
                    </div>

                    <div
                        className={`relative my-8 mt-2 rounded-2xl p-5 py-6 ring-[.7px] ring-zinc-300 transition-[background-color] duration-200 lg:p-6 lg:px-8 dark:ring-zinc-700 ${
                            editAbout ? "" : "bg-blue-50 dark:bg-zinc-800"
                        }`}
                    >
                        <div className="text-title mb-2 flex h-10 items-center justify-between gap-2 text-xl font-bold">
                            <h2 className="font-title">Sobre Mim</h2>
                            {editAbout && (
                                <button
                                    onClick={() => {
                                        setEditAbout(false);
                                        setTimeout(() => {
                                            document.getElementById("about")?.focus();
                                        }, 100);
                                    }}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold ring-1 ring-zinc-300 transition-[background-color] duration-200 hover:bg-zinc-300/40 dark:ring-zinc-700"
                                >
                                    <IconEdit /> Editar
                                </button>
                            )}
                        </div>
                        <div className="py-5">
                            <Textarea
                                className={`h-35 resize-none text-sm`}
                                id="about"
                                value={previewUser?.about}
                                placeholder="Nada Informado..."
                                disabled={editAbout}
                                onChange={(e) => handleAboutChange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
