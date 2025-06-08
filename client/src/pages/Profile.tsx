// import { deleteImageFromCloudinary } from "@/cloudinary";
import { ButtonOutlined, ButtonPrimary } from "@/components/Button";
import { EditModal } from "@/components/EditModal";
import { FormInput } from "@/components/FormInput";
import { InfoField } from "@/components/InfoField";
import { Loader } from "@/components/Loader";
import { ProgressProfile } from "@/components/ProgressProfile";
import { Textarea } from "@/components/Textarea";
import { UnsaveContainer } from "@/components/UnsaveContainer";
import { useUser } from "@/contexts/UserContext";
import { db } from "@/firebase";
import { useImageUpload } from "@/hooks/useImageUpload";
import { UserData } from "@/utils/types/userDataType";

import { IconArrowRight, IconEdit, IconPencil, IconUserCog } from "@tabler/icons-react";
import { Tags } from "@utils/data";

import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Profile = () => {
    const { upload } = useImageUpload();

    // USER DATAS
    const { user, userData, updateUser } = useUser();
    const [tags, setTags] = useState<DocumentData[]>([]);

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

    const [previewPhone, setPreviewPhone] = useState<string | undefined>(undefined);

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
                fName: previewFName,
                lName: previewLName,
                phone: previewPhone,
                about: previewAbout,
            };

            if (previewImageFile) {
                const uploadUrl = await upload(previewImageFile, userData?.image);
                newUserData.image = uploadUrl;
            }

            updateUser(newUserData);
            setUnsave(false);
            setEditAbout(true);
        } catch (error) {
            console.log(error);
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
                setPreviewPhone(userData.phone);
                setPreviewAbout(userData.about);
            } finally {
                setLoading(false);
            }
        }
    }, [userData]);

    // PULL USER TAGS
    useEffect(() => {
        const fetchTags = async () => {
            try {
                if (!user?.uid) return;

                const tagsRef = collection(db, "Tags");
                const q = query(tagsRef, where("User", "==", user.uid));
                const querySnapshot = await getDocs(q);

                const tagsData = querySnapshot.docs.map((doc) => doc.data());
                setTags(tagsData);
            } catch (err) {
                console.error("Erro ao buscar tags:", err);
            }
        };

        fetchTags();
    }, [user]);

    const saveEditInfo = () => {
        setEditInfo(false);

        if (
            userData?.fName == previewFName &&
            userData?.lName == previewLName &&
            userData?.phone == previewPhone
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
        setPreviewPhone(userData?.phone || undefined);
        setPreviewAbout(userData?.about || undefined);
    };

    return (
        <>
            {loading && (
                <AnimatePresence>
                    <Loader />
                </AnimatePresence>
            )}

            {unsave && <UnsaveContainer onCancel={handleCancelUnsave} onSave={handleUpdateUser} />}

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
                                placeholder: "Telefone",
                                type: "text",
                                phone: true,
                                value: previewPhone,
                                onChange: (e) => setPreviewPhone(e.target.value),
                            }}
                            label="Telefone"
                        />
                        <div className="mt-20 flex flex-col-reverse items-start gap-2 lg:flex-row lg:items-center lg:justify-end">
                            <ButtonOutlined
                                text="Cancelar"
                                small
                                onClick={() => cancelEditInfo()}
                            />
                            <ButtonPrimary
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
                className={`relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-white p-1 pb-10 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] lg:mx-0`}
            >
                {/* PFP AND USER BANNER */}
                <div className="relative">
                    {userData?.banner ? (
                        <img
                            src={
                                "https://wallpapers.com/images/hd/1920x1080-aesthetic-5n9t0pm3cknenux6.jpg"
                            }
                            alt="Banner"
                            className="h-40 w-full rounded-2xl object-cover md:h-60"
                        />
                    ) : (
                        <div className="h-40 w-full rounded-2xl bg-stone-300 md:h-60"></div>
                    )}

                    <figure
                        className="group absolute bottom-15 left-1/2 h-30 w-30 -translate-x-1/2 cursor-pointer rounded-3xl ring-3 ring-white md:left-10 md:h-40 md:w-40 md:translate-x-0 lg:-bottom-2"
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

                            <div className="text-title absolute bottom-[-10px] left-[-10px] grid place-items-center rounded-full bg-white p-2 opacity-100 shadow-[0px_0px_60px_1px_rgba(0,0,0,0.1)] transition-[opacity] duration-200 group-hover:opacity-100 lg:opacity-0">
                                <IconPencil className="size-5 lg:size-8" />
                            </div>
                        </div>
                    </figure>
                    {/* USER TAGS */}
                    <ul className="mx-auto mt-15 flex max-w-[90%] flex-wrap justify-center gap-2 md:mx-0 md:mt-5 md:ml-55 md:justify-start">
                        {tags.map((tag, index) => {
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

                <div className="mt-15 flex items-center justify-center">
                    <div className="before:bg-secondary/80 relative flex items-center rounded-2xl bg-zinc-100 py-2 text-sm font-semibold before:absolute before:top-1/2 before:left-0 before:z-[0] before:h-[80%] before:w-30 before:-translate-y-1/2 before:rounded-2xl before:content-['']">
                        <p className="text-accent relative z-1 flex w-30 cursor-pointer items-center justify-center">
                            Informações
                        </p>
                        <p className="relative z-1 flex w-30 cursor-pointer items-center justify-center text-zinc-600">
                            Denúncias
                        </p>
                    </div>
                </div>

                <div className="mt-5 px-2 lg:px-6">
                    {/* USER E-MAIL, NAME AND PHONE */}
                    <div className="relative my-8 rounded-2xl p-5 py-6 ring-1 ring-zinc-300 lg:p-6 lg:px-8">
                        <div className="mb-2 flex h-10 items-center justify-between gap-2 text-xl font-bold text-zinc-800">
                            <h2 className="font-title">Informações pessoais</h2>
                            <button
                                onClick={() => setEditInfo(true)}
                                className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-300 transition-[background-color] duration-200 hover:bg-zinc-300/40"
                            >
                                <IconEdit /> Editar
                            </button>
                        </div>
                        <dl className="grid grid-cols-1 gap-4 py-5 text-sm md:text-[1rem] lg:grid-cols-3">
                            <InfoField
                                topic="Nome Inteiro"
                                info={`${previewFName} ${previewLName}`}
                            />
                            <InfoField topic="E-mail" info={userData?.email} />
                            <InfoField
                                topic="Telefone"
                                info={previewPhone ? previewPhone : "Não informado"}
                            />
                        </dl>
                    </div>
                    {/* USER E-MAIL, NAME AND PHONE */}
                    <div
                        className={`relative my-8 mt-2 rounded-2xl p-5 py-6 ring-1 ring-zinc-300 transition-[background-color] duration-200 lg:p-6 lg:px-8 ${editAbout ? "" : "bg-blue-50"}`}
                    >
                        <div className="mb-2 flex h-10 items-center justify-between gap-2 text-xl font-bold text-zinc-800">
                            <h2 className="font-title">Sobre Mim</h2>
                            {editAbout && (
                                <button
                                    onClick={() => {
                                        setEditAbout(false);
                                        setTimeout(() => {
                                            document.getElementById("about")?.focus();
                                        }, 100);
                                    }}
                                    className="flex cursor-pointer items-center gap-2 rounded-lg p-2 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-300 transition-[background-color] duration-200 hover:bg-zinc-300/40"
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

            <ProgressProfile />
        </>
    );
};
