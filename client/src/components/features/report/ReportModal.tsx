import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ModalDefaultProps } from "@/contexts/ModalContext";
import { useCreateReport } from "@/hooks/report/useCreateReport";
import { useReportCategories } from "@/hooks/report/useReportCategories";
import { IconChevronRight } from "@tabler/icons-react";

type ReportModalProps = ModalDefaultProps & {
    id: string;
    type: "post" | "comment" | "user";
    preview?: {
        title?: string;
        image?: string;
        subTitle?: string;
    };
};

export const ReportModal = ({ id, type, preview, closeModal, zIndex }: ReportModalProps) => {
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
    const [description, setDescription] = useState("");

    const { data: categoriesData, isLoading: categoriesLoading } = useReportCategories(true, type);

    const { mutate: createReport, isPending: isCreating } = useCreateReport();

    const handleCreateReport = () => {
        if (!selectedCategory) return;

        createReport(
            {
                category: selectedCategory._id,
                reportedItemType: type,
                reportedItemId: id,
                desc: description,
            },
            {
                onSuccess: () => {
                    toast.success("Denúncia enviada com sucesso!");
                    closeModal();
                    setSelectedCategory(null);
                    setDescription("");
                },
                onError: () => {
                    toast.error("Erro ao enviar denúncia. Tente novamente.");
                },
            },
        );
    };

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit w-full max-w-[97%] rounded-2xl bg-white pb-4 lg:max-w-lg dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <header className="space-y-4 border-b-1 border-zinc-200 px-3 py-6 lg:px-5 dark:border-zinc-800">
                <div>
                    <h3 className="font-title text-title text-xl lg:text-2xl">
                        Reportar{" "}
                        {type === "post"
                            ? "publicação"
                            : type === "user"
                              ? "usuário"
                              : "comentário"}
                    </h3>
                    <p className="text-subtitle text-sm">Selecione uma categoria para reportar</p>
                </div>

                {preview && (
                    <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-800/50">
                        {preview.image && (
                            <img
                                src={preview.image}
                                alt="Preview"
                                className="h-12 w-12 rounded-full object-cover"
                            />
                        )}
                        <div className="flex flex-col">
                            {preview.title && (
                                <span className="text-title text-sm font-medium">
                                    {preview.title}
                                </span>
                            )}
                            {preview.subTitle && (
                                <span className="text-subtitle line-clamp-1 text-xs">
                                    {preview.subTitle}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </header>
            <main className="">
                {selectedCategory && (
                    <>
                        <div className="h-full p-5">
                            <h3 className="text-title text-md mb-4 lg:text-lg">
                                {selectedCategory.title}
                            </h3>
                            <p className="text-subtitle mb-12 text-xs lg:text-sm">
                                {selectedCategory.desc}
                            </p>
                            <FormInput
                                label="Mensagem (Opcional)"
                                textArea
                                textAreaProps={{
                                    rows: 5,
                                    value: description,
                                    onChange: (e) => setDescription(e.target.value),
                                }}
                            />
                        </div>

                        <div className="flex h-fit items-center justify-end gap-3 border-t-1 border-zinc-200 p-5 dark:border-zinc-800">
                            <Button
                                text="Cancelar"
                                size="small"
                                styleType="outlined"
                                onClick={() => setSelectedCategory(null)}
                                disabled={isCreating}
                            />
                            <Button
                                text={isCreating ? "Enviando..." : "Enviar"}
                                size="small"
                                onClick={handleCreateReport}
                                disabled={isCreating}
                            />
                        </div>
                    </>
                )}

                {!selectedCategory && (
                    <div className="p-5">
                        <ul className="scrollbar-thin justify-center divide-y-1 divide-zinc-200 overflow-auto rounded-2xl ring-1 ring-zinc-200 dark:divide-zinc-800 dark:ring-zinc-800">
                            {categoriesLoading ? (
                                <div className="flex h-full items-center">
                                    <p className="text-zinc-500">Carregando categorias...</p>
                                </div>
                            ) : (
                                categoriesData?.categories?.map((category: any) => (
                                    <li
                                        className="lg:text-md text-subtitle hover:text-title text-md flex cursor-pointer items-center justify-between p-7 px-6 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                                        key={category._id}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category.title}
                                        <IconChevronRight className="size-5" />
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </main>
        </motion.div>
    );
};
