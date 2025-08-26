import { InfoField } from "@/components/ui/InfoField";
import { Button } from "@/components/ui/Button";
import { EditModal } from "@/components/ui/EditModal";
import { FormInput } from "@/components/ui/FormInput";
import { Loader } from "@/components/ui/Loader";
import { Textarea } from "@/components/ui/Textarea";
import { UnsaveContainer } from "@/components/drop/UnsaveContainer";
import { useUser } from "@/contexts/UserContext";
import { useChangeImage } from "@/hooks/images/useChangeImage";
import { useReload } from "@/hooks/user/useUpdate";
import { UserData } from "@/utils/types/userDataType";

import { IconArrowRight, IconEdit, IconPencil, IconUserCog } from "@tabler/icons-react";
import { Tags } from "@utils/data";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const ViewProfile = () => {
    // const { upload } = useImageUpload();

    // USER DATAS
    const { userData, userTags, updateUser } = useUser();
    const changeImage = useChangeImage();
    const reloadUser = useReload();

    // EDIT MODAL
    const [editInfo, setEditInfo] = useState(false);
    const [editAbout, setEditAbout] = useState(true);

    // LOADING STATE
    const [loading, setLoading] = useState(true);

    // UNSAVE STATE
    const [unsave, setUnsave] = useState(false);

    // PREVIEWs

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);

    const [previewFName, setPreviewFName] = useState("");
    const [previewLName, setPreviewLName] = useState("");

    const [previewUsername, setPreviewUsername] = useState<string | undefined>(undefined);

    const [previewAbout, setPreviewAbout] = useState<string | undefined>(undefined);

    // INPUT REF
    const fileInputRef = useRef<HTMLInputElement>(null);

    // HANDLE CHANGE FILE IMAGE INPUT
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImageFile(file);

            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
            setUnsave(true);
        }
    };

    // HANDLE CHANGE ABOUT INPUT
    const handleAboutChange = (body: string) => {
        setPreviewAbout(body);
        setUnsave(true);
    };

    // HANDLE UPDATE USER
    const handleUpdateUser = async () => {
        try {
            let newUserData: Partial<UserData> = {
                username: previewUsername,
                fName: previewFName,
                lName: previewLName,
                about: previewAbout,
            };

            if (previewImageFile) {
                const response = await changeImage.mutateAsync({ newImage: previewImageFile });
                newUserData.image = response.data.image_url;
            }

            console.log(newUserData);

            await updateUser(newUserData);
            await reloadUser.mutateAsync();
        } catch (error) {
            console.log(error);
        } finally {
            setUnsave(false);
            setEditAbout(true);
        }
    };

    // HANDLE CHANGE FILE IMAGE INPUT
    const handleCancelUnsave = async () => {
        setUnsave(false);
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        cancelEditInfo();
        setEditAbout(true);
        setPreviewAbout(userData?.about);
        console.log(userData?.about);
        console.log(previewAbout);
    };

    // PULL USER DATA
    useEffect(() => {
        if (userData) {
            try {
                setPreviewFName(userData.fName);
                setPreviewLName(userData.lName);
                setPreviewUsername(userData.username);
                setPreviewAbout(userData.about);
            } finally {
                setLoading(false);
            }
        }
    }, [userData]);

    const saveEditInfo = () => {
        setEditInfo(false);

        if (
            userData?.fName == previewFName &&
            userData?.lName == previewLName &&
            userData?.username == previewUsername
        ) {
            setUnsave(false);
            return;
        }

        setUnsave(true);
    };

    const cancelEditInfo = () => {
        setEditInfo(false);

        setPreviewFName(userData?.fName || "");
        setPreviewLName(userData?.lName || "");
        setPreviewUsername(userData?.username)
        setPreviewAbout(userData?.about || undefined);
    };

    return (
        <>
            {loading && (
                <AnimatePresence>
                    <Loader />
                </AnimatePresence>
            )}

            

            {editInfo && (
                <EditModal
                    onClose={() => cancelEditInfo()}
                    title="Editar Perfil"
                    Icon={IconUserCog}
                >
                    <div className="space-y-5 p-5">
                        <FormInput
                            inputProps={{
                                placeholder: "Nome",
                                type: "text",
                                value: previewFName,
                                onChange: (e) => setPreviewFName(e.target.value),
                            }}
                            label="Nome"
                        />
                        <FormInput
                            inputProps={{
                                placeholder: "Sobrenome",
                                type: "text",
                                value: previewLName,
                                onChange: (e) => setPreviewLName(e.target.value),
                            }}
                            label="Sobrenome"
                        />
                        <FormInput
                            inputProps={{
                                placeholder: "Username",
                                type: "text",
                                value: previewUsername,
                                onChange: (e) => setPreviewUsername(e.target.value),
                            }}
                            label="Username"
                        />
                        <div className="mt-20 flex flex-col-reverse items-start gap-2 lg:flex-row lg:items-center lg:justify-end">
                            <Button
                                styleType="outlined"
                                text="Cancelar"
                                small
                                onClick={() => cancelEditInfo()}
                            />
                            <Button
                                styleType="primary"
                                text="Salvar"
                                className=""
                                small
                                Icon={IconArrowRight}
                                onClick={() => saveEditInfo()}
                            />
                        </div>
                    </div>
                </EditModal>
            )}

            <div
                className={`relative w-full overflow-hidden rounded-2xl max-w-4xl bg-white p-1 pb-10 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] lg:mx-0 dark:bg-zinc-900`}
            >
                {unsave && <UnsaveContainer onCancel={handleCancelUnsave} onSave={handleUpdateUser} />}
                {/* PFP AND USER BANNER */}
                <div className="relative">
                    {userData?.banner ? (
                        <img
                            src={userData?.banner}
                            alt="Banner"
                            className="h-40 w-full rounded-2xl object-cover md:h-60"
                        />
                    ) : (
                        <div className="h-40 w-full rounded-2xl bg-stone-300 md:h-60 dark:bg-zinc-800"></div>
                    )}

                    <figure
                        className="group absolute bottom-15 left-1/2 h-30 w-30 -translate-x-1/2 cursor-pointer rounded-3xl ring-3 ring-white md:left-10 md:h-40 md:w-40 md:translate-x-0 lg:-bottom-2 dark:ring-zinc-900"
                        onClick={() => {
                            fileInputRef.current?.click();
                        }}
                    >
                        <div className="relative h-full w-full">
                            <img
                                src={previewImage ? previewImage : userData?.image}
                                alt="Foto de perfil"
                                className="relative h-full w-full rounded-3xl object-cover"
                            />

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />

                            <div className="text-title absolute bottom-[-10px] left-[-10px] grid place-items-center rounded-full bg-white p-2 opacity-100 shadow-[0px_0px_60px_1px_rgba(0,0,0,0.1)] transition-[opacity] duration-200 group-hover:opacity-100 lg:opacity-0 dark:bg-zinc-900">
                                <IconPencil className="size-5 lg:size-8" />
                            </div>
                        </div>
                    </figure>
                    {/* USER TAGS */}
                    <ul className="mx-auto mt-15 flex max-w-[90%] flex-wrap justify-center gap-2 md:mx-0 md:mt-5 md:ml-55 md:justify-start">
                        {userTags.map((tag: { Tag: string }, index: number) => {
                            const { className, Icon } = Tags.find((t) => t.Tag === tag.Tag) || {};
                            return (
                                <li
                                    key={index}
                                    className={`flex w-fit items-center gap-2 rounded-xl p-2 px-2 text-[12px] font-medium capitalize md:text-sm ${className ? className : "text-title bg-gray-200"}`}
                                >
                                    {Icon && <Icon className="size-5 stroke-[2.2]" />}
                                    {tag.Tag}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="mt-5 px-2 lg:px-6">
                    {/* USER E-MAIL, NAME AND PHONE */}
                    <div className="relative my-8 rounded-2xl p-5 py-6 ring-1 ring-zinc-300 lg:p-6 lg:px-8 dark:ring-zinc-700">
                        <div className="text-title mb-2 flex h-10 items-center justify-between gap-2 text-xl font-bold">
                            <h2 className="font-title">Informações pessoais</h2>
                            <button
                                onClick={() => setEditInfo(true)}
                                className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold ring-1 ring-zinc-300 transition-[background-color] duration-200 hover:bg-zinc-300/40 dark:ring-zinc-700"
                            >
                                <IconEdit /> Editar
                            </button>
                        </div>
                        <dl className="grid grid-cols-1 gap-4 py-5 text-sm md:text-[1rem] lg:grid-cols-3">
                            <InfoField
                                topic="Nome Inteiro"
                                info={`${previewFName} ${previewLName}`}
                            />
                            <InfoField topic="Username" info={previewUsername!} />
                            {/* <InfoField
                                topic="Aniversário"
                                info={previewUsername!}
                            /> */}
                        </dl>
                    </div>
                    {/* USER ABOUT */}
                    <div
                        className={`relative my-8 mt-2 rounded-2xl p-5 py-6 ring-1 ring-zinc-300 transition-[background-color] duration-200 lg:p-6 lg:px-8 dark:ring-zinc-700 ${editAbout ? "" : "bg-blue-50 dark:bg-zinc-800"}`}
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
                                value={previewAbout}
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
