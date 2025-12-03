import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { useCreateReport } from "@/hooks/report/useCreateReport";
import { useReportCategories } from "@/hooks/report/useReportCategories";
import { ReportCategoryData } from "@/types/categoryDataType";
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

export const ReportModal = ({ id, type, preview, zIndex }: ReportModalProps) => {
    const [selectedCategory, setSelectedCategory] = useState<ReportCategoryData | null>(null);
    const [description, setDescription] = useState("");
    const { closeModal } = useModal();

    const { data: categoriesData, isLoading: categoriesLoading } = useReportCategories(true, type);
    const { mutate: createReport, isPending: isCreating } = useCreateReport();

    const categories = (categoriesData?.categories || []) as ReportCategoryData[];

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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="my-auto h-fit w-[96%] max-w-lg rounded-2xl bg-white pb-4 transition-all lg:w-full dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <header className="space-y-4 border-b-1 border-zinc-200 px-5 py-6 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-title text-title text-xl lg:text-2xl">
                            Reportar{" "}
                            {type === "post"
                                ? "publicação"
                                : type === "user"
                                  ? "usuário"
                                  : "comentário"}
                        </h3>
                        <p className="text-subtitle text-sm">
                            Selecione uma categoria para reportar
                        </p>
                    </div>

                    <ModalProvider.Close />
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
            <main className="overflow-hidden">
                {selectedCategory && (
                    <div>
                        <div className="h-full p-5">
                            <h3 className="text-title text-md mb-2 lg:text-lg">
                                {selectedCategory.title}
                            </h3>
                            <p className="text-subtitle mb-6 text-xs lg:text-sm">
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
                    </div>
                )}

                {!selectedCategory && (
                    <div className="p-5">
                        <ul className="scrollbar-thin justify-center divide-y-1 divide-zinc-200 overflow-auto rounded-2xl ring-1 ring-zinc-200 dark:divide-zinc-800 dark:ring-zinc-800">
                            {categoriesLoading && (
                                <div className="flex h-full items-center">
                                    <p className="text-zinc-500">Carregando categorias...</p>
                                </div>
                            )}

                            {categories.map((category: ReportCategoryData) => (
                                <li
                                    className="lg:text-md text-subtitle hover:text-title text-md flex cursor-pointer items-center justify-between p-5 px-3 transition-all hover:bg-zinc-50 lg:p-7 lg:px-6 dark:hover:bg-zinc-800/50"
                                    key={category._id}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category.title}
                                    <IconChevronRight className="size-5" />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </motion.div>
    );
};
