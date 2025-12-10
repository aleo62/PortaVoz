import { RoutesPath } from "@/app/Routes";
import { DropdownFiles } from "@/components/ui/DropdownFiles";
import { Fieldset } from "@/components/ui/Fieldset";
import { File, PreviewImage } from "@/components/ui/File";
import { useModal } from "@/contexts/ModalContext";
import { useToast } from "@/contexts/ToastContext";
import { useUserCommunities } from "@/hooks/community/useUserCommunities";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useStoreUser } from "@/stores/userStore";
import { postSchema, RequestPostData } from "@/types/postDataType";
import { formatApiError } from "@/utils/handleApiError";
import { PostMap } from "@components/features/post/PostMap";
import { Button } from "@components/ui/Button";
import { FormInput } from "@components/ui/FormInput";
import { InputLocation } from "@components/ui/InputLocation";
import {
    IconAlignBoxLeftMiddleFilled,
    IconMapPinFilled,
    IconPhotoFilled,
    IconTagFilled,
    IconX,
} from "@tabler/icons-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
    const createPost = useCreatePost();
    const navigate = useNavigate();
    const { openModal } = useModal();
    const { user, updateUser } = useStoreUser();
    const { data: communitiesData } = useUserCommunities(user?._id);
    const [reportForm, setReportForm] = useState<Partial<RequestPostData>>({});

    const [previewHashtag, setPreviewHashtag] = useState<string>("");
    const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

    const { errorToast } = useToast();
    const remainingReports = user?.meta?.limits?.remainingReports ?? 0;
    const reportsResetAt = user?.meta?.limits?.reportsResetAt;

    const onUploadImage = (file: File) => {
        const url = URL.createObjectURL(file);
        setPreviewImages((prev) => [
            ...prev,
            { url, name: file.name, size: file.size, isLoading: true },
        ]);
        setReportForm((prev) => ({
            ...prev,
            images: [...((prev as RequestPostData).images || []), file],
        }));

        setTimeout(() => {
            setPreviewImages((prev) =>
                prev.map((image) => (image.url === url ? { ...image, isLoading: false } : image)),
            );
        }, 2000);
    };

    const myCommunities = communitiesData?.pages.flatMap((page) => page.communities) || [];

    const handlePostSubmission = async (data: RequestPostData) => {
        try {
            const { status } = await createPost.mutateAsync({
                formData: data,
            });

            if (status === 201) {
                if (user?.meta?.limits) {
                    const nextRemaining = Math.max(0, (user.meta.limits.remainingReports ?? 0) - 1);
                    updateUser({
                        meta: {
                            ...user.meta,
                            limits: {
                                ...user.meta.limits,
                                remainingReports: nextRemaining,
                            },
                        },
                    });
                }
                navigate(RoutesPath("Feed")!);
            }
        } catch (error: any) {
            errorToast(formatApiError(error, "Erro inesperado no servidor."));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = postSchema.safeParse(reportForm);

        if (!result.success) {
            errorToast("Preencha todos os campos corretamente.");
            return;
        }

        if (remainingReports <= 0) {
            openModal("reportLimit", {
                remainingReports,
                resetAt: reportsResetAt,
            });
            return;
        }

        if (myCommunities.length > 0) {
            openModal("selectCommunity", {
                onConfirm: (data: {
                    communityIds: string[];
                    visibility: "global" | "communities" | "both";
                }) => {
                    handlePostSubmission({
                        ...(reportForm as RequestPostData),
                        ...data,
                    });
                },
                myCommunities,
            });
        } else {
            handlePostSubmission(reportForm as RequestPostData);
        }
    };

    return (
        <main className="mx-auto mt-5 w-full max-w-5xl px-1 lg:mt-10 lg:px-10">
            <form className="space-y-10" onSubmit={(e: FormEvent) => handleSubmit(e)}>
                <Fieldset
                    Icon={IconPhotoFilled}
                    title="Enviar Images"
                    ok={(reportForm.images?.length ?? 0) > 0}
                >
                    <div className="space-y-5 p-3 lg:p-5">
                        <DropdownFiles onUpload={onUploadImage} />

                        {previewImages.map((image, index) => (
                            <File
                                key={image.url}
                                image={image}
                                onDeleteFile={() => {
                                    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
                                    setReportForm((prev) => ({
                                        ...prev,
                                        images: prev.images!.filter((_, i) => i !== index),
                                    }));
                                }}
                            />
                        ))}
                    </div>
                </Fieldset>
                <Fieldset
                    Icon={IconAlignBoxLeftMiddleFilled}
                    title="Conteúdo Principal"
                    ok={!!reportForm.desc && !!reportForm.title}
                >
                    <div className="space-y-5 p-3 lg:p-5">
                        <FormInput
                            label="Título"
                            inputProps={{
                                placeholder: "Buraco em minha rua",
                                value: reportForm.title,
                                onChange: (e) =>
                                    setReportForm({ ...reportForm, title: e.target.value }),
                            }}
                            maxLength={50}
                        />

                        <FormInput
                            label="Descrição"
                            textArea
                            textAreaProps={{
                                rows: 7,
                                placeholder: "",
                                value: reportForm.desc,
                                onChange: (e) =>
                                    setReportForm({ ...reportForm, desc: e.target.value }),
                            }}
                            maxLength={500}
                        />
                    </div>
                </Fieldset>
                <Fieldset
                    Icon={IconMapPinFilled}
                    title="Localização"
                    ok={!!reportForm.address && !!reportForm.location}
                >
                    <div className="grid gap-4 p-3 lg:grid-cols-2 lg:p-5">
                        <InputLocation
                            reportForm={reportForm as RequestPostData}
                            setReportForm={setReportForm}
                        />
                        <PostMap
                            latitude={reportForm.location?.latitude ?? -22.725}
                            longitude={reportForm.location?.longitude ?? -47.6476}
                        />
                    </div>
                </Fieldset>

                <Fieldset
                    Icon={IconTagFilled}
                    title="Hashtags"
                    ok={(reportForm.hashtags?.length ?? 0) > 0}
                >
                    <div className="space-y-7 p-3 lg:p-5">
                        <div className="flex items-center gap-2">
                            {reportForm.hashtags?.map((hashtag, index) => (
                                <span className="text-subtitle relative flex w-fit rounded-xl p-2 px-6 pl-4 ring-1 ring-zinc-200 dark:ring-zinc-800">
                                    {hashtag}{" "}
                                    <IconX
                                        onClick={() =>
                                            setReportForm((prev) => ({
                                                ...prev,
                                                hashtags: prev.hashtags!.filter(
                                                    (_, i) => i !== index,
                                                ),
                                            }))
                                        }
                                        className="absolute top-2 right-2 size-3"
                                    ></IconX>
                                </span>
                            ))}
                        </div>
                        <FormInput
                            label="Hashtag"
                            inputProps={{
                                placeholder: "Água",
                                value: previewHashtag,
                                onChange: (e) => setPreviewHashtag(e.target.value),
                                onKeyDown: (e) => {
                                    if (e.key === "Enter" && !!previewHashtag) {
                                        e.preventDefault();
                                        setReportForm((prev) => ({
                                            ...prev,
                                            hashtags: [...(prev.hashtags || []), previewHashtag],
                                        }));
                                    }
                                },
                            }}
                        />
                    </div>
                </Fieldset>

                <Button
                    text="Enviar Post"
                    className="mt-20 ml-auto"
                    isLoading={createPost.isPending}
                />
            </form>
        </main>
    );
};
