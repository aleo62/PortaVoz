import { PostMap } from "@/components/features/post/PostMap";
import { Button } from "@/components/ui/Button";
import { DropdownFiles } from "@/components/ui/DropdownFiles";
import { FormInput } from "@/components/ui/FormInput";
import { InputLocation } from "@/components/ui/InputLocation";
import { RequestPostData } from "@/utils/types/postDataType";
import { FormEvent, useState } from "react";

export const CreatePost = () => {
    const [reportForm, setReportForm] = useState<Partial<RequestPostData>>({});

    const onUploadImage = (file: File) => {
        try {
            setReportForm((prev) => ({
                ...prev,
                images: [...((prev as RequestPostData).images || []), file],
            }));
        } catch (err) {
            throw err;
        }
    };

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

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        console.log(reportForm);
    };

    return (
        <main className="mx-auto mt-5 w-full max-w-6xl lg:mt-10 lg:px-10">
            <form className="space-y-10" onSubmit={(e: FormEvent) => handleSubmit(e)}>
                <fieldset className="flex flex-col gap-3">
                    <label className="font-title text-title text-2xl">Enviar Imagens</label>
                    <DropdownFiles onUpload={onUploadImage} />
                    <div className="flex items-center justify-center gap-1.5">
                        {reportForm.images &&
                            reportForm.images.map((file, index) => {
                                const image = URL.createObjectURL(file);

                                return (
                                    <Files
                                        key={index}
                                        image={image}
                                        onDeleteFile={() => {
                                            setReportForm({
                                                ...reportForm,
                                                images: reportForm.images?.filter(
                                                    (_, i) => i !== index,
                                                ) as File[],
                                            });
                                        }}
                                    />
                                );
                            })}

                        {[1, 2, 3]
                            .filter((index) => (reportForm.images?.length || 0) < index)
                            .map(() => (
                                <div className="border-accent h-15 w-15 rounded-xl border-[2px] border-dashed bg-transparent lg:h-20 lg:w-20"></div>
                            ))}
                    </div>
                </fieldset>

                <FormInput
                    label="Título"
                    inputProps={{
                        placeholder: "Buraco em minha rua",
                        onChange: (e) => setReportForm({ ...reportForm, title: e.target.value }),
                    }}
                />
                <FormInput
                    label="Descrição"
                    textArea
                    textAreaProps={{ rows: 7, placeholder: "" }}
                />
                <div className="grid lg:grid-cols-2 gap-2">
                    <InputLocation
                        reportForm={reportForm as RequestPostData}
                        setReportForm={setReportForm!}
                    />
                    <PostMap latitude={reportForm.location?.latitude! || -22.725} longitude={reportForm.location?.longitude! || -47.6476} />
                </div>

                <Button text="Enviar Post" className="mt-20 ml-auto" />
            </form>
        </main>
    );
};
