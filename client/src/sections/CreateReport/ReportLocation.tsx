import { FormInput } from "@/components/general/FormInput";
import { PostData } from "@/utils/types/postDataType";
import React, { useEffect } from "react";

export const ReportLocation = ({
    validate,
    reportForm,
    setReportForm,
}: {
    validate: () => void;
    reportForm: PostData;
    setReportForm: React.Dispatch<React.SetStateAction<PostData>>;
}) => {
    useEffect(() => {
        if (!reportForm) return;

        if (reportForm.title && reportForm.desc) {
            validate();
        }
    }, [reportForm]);
    return (
        <>
            <h1 className="font-title text-title mb-7 text-2xl font-semibold">
                Conteudo da Denuncia
            </h1>
            <FormInput
                label="Título"
                className="mb-4"
                inputProps={{
                    type: "text",
                    placeholder: "Título",
                    required: true,
                    onChange: (e) => setReportForm({ ...reportForm, title: e.target.value }),
                }}
            />
            <FormInput
                label="Descrição"
                className="mb-4"
                textArea
                textAreaProps={{
                    placeholder: "Descrição",
                    required: true,
                    rows: 7,
                    onChange: (e) => setReportForm({ ...reportForm, desc: e.target.value }),
                }}
            />
        </>
    );
};
