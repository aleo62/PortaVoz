import { Button } from "@/components/general/Button";
import { Input } from "@/components/general/Input";
import { useToast } from "@/contexts/ToastContext";
import { PostData } from "@/utils/types/postDataType";
import { IconPlus, IconX } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

export const ReportTags = ({
    validate,
    reportForm,
    setReportForm,
}: {
    validate: () => void;
    reportForm: PostData;
    setReportForm: React.Dispatch<React.SetStateAction<PostData>>;
}) => {
    const { errorToast } = useToast();
    const [tag, setTag] = useState<string>();

    useEffect(() => {
        if (!reportForm) return;

        if (reportForm.title && reportForm.desc) {
            validate();
        }
    }, [reportForm]);

    const handleSubmitTag = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!tag) return;
        setReportForm({ ...reportForm, tags: [...reportForm.tags, tag] });
        setTag("");
    };

    return (
        <>
            <h1 className="font-title text-title mb-7 text-2xl font-semibold">Tags da Denuncia</h1>
            <div className="flex h-30 w-full flex-wrap items-center gap-2 rounded-lg bg-zinc-100 p-5 dark:bg-zinc-800">
                {reportForm.tags.map((tag) => (
                    <span
                        className="text-title flex items-center gap-2 rounded-lg bg-zinc-200 px-3 py-2 dark:bg-zinc-700"
                        onClick={() =>
                            setReportForm({
                                ...reportForm,
                                tags: reportForm.tags.filter((t) => t !== tag),
                            })
                        }
                    >
                        {tag} <IconX className="text-subtitle size-3" />
                    </span>
                ))}
            </div>

            <form
                action=""
                onSubmit={(e) => handleSubmitTag(e)}
                className="mt-4 flex items-center justify-center gap-2"
            >
                <Input
                    type="text"
                    placeholder="Tag"
                    className="flex-1"
                    onChange={(e) => setTag(e.target.value)}
                />
                <button className="text-title bg-accent flex h-full items-center justify-center rounded-xl p-3">
                    <IconPlus />
                </button>
            </form>
        </>
    );
};
