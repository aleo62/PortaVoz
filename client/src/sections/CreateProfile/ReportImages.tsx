import { PostData } from "@/utils/types/postDataType";
import { IconCloudUpload } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

export const ReportImages = ({
    validate,
    reportForm,
    setReportForm,
}: {
    validate: () => void;
    reportForm: PostData;
    setReportForm: React.Dispatch<React.SetStateAction<PostData>>;
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setReportForm({ ...reportForm, images: [...(reportForm.images as File[]), file] });

            const imageUrl = URL.createObjectURL(file);
            setPreviewImages([...previewImages, imageUrl]);
        }
    };

    useEffect(() => {
        if (!reportForm) return;
        if (reportForm.images && reportForm.images.length > 0 && reportForm.images.length <= 3) {
            console.log("sdf");
            validate();
        }
    }, [reportForm]);

    const Files = ({ image, onDeleteFile }: { image: string; onDeleteFile: () => void }) => {
        return (
            <img
                src={image}
                alt=""
                className="h-20 w-20 rounded-md object-cover"
                onClick={onDeleteFile}
            />
        );
    };

    return (
        <>
            <h1 className="font-title text-title mb-7 text-2xl font-semibold">
                Imagens da Denuncia
            </h1>
            <div
                onClick={() => {
                    fileInputRef.current?.click();
                }}
                className="border-accent text-title mx-auto flex h-65 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-4 border-dashed"
            >
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                <IconCloudUpload className="h-20 w-20 stroke-[1.5]" />
                <p>Clique aqui para mandar uma imagem</p>
            </div>
            <div className="mt-2 flex items-center gap-2">
                {previewImages.map((image, index) => (
                    <Files
                        key={index}
                        image={image}
                        onDeleteFile={() => {
                            setPreviewImages(previewImages.filter((_, i) => i !== index));
                            setReportForm({
                                ...reportForm,
                                images: reportForm.images?.filter((_, i) => i !== index) as File[],
                            });
                        }}
                    />
                ))}
            </div>
        </>
    );
};
