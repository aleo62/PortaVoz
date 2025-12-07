import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { motion } from "framer-motion";
import { useState } from "react";

type EditProfileModalProps = ModalDefaultProps & {
    initialData: {
        fName: string;
        lName: string;
        username: string;
        about: string;
    };
    onConfirm: (data: { fName: string; lName: string; username: string; about: string }) => void;
};

export const EditProfileModal = ({
    zIndex,
    initialData,
    onConfirm,
}: EditProfileModalProps) => {
    const { closeModal } = useModal();
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onConfirm(formData);
        closeModal();
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-lg rounded-2xl h-fit my-auto bg-white p-6 shadow-xl dark:bg-zinc-900"
            style={{ zIndex }}
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-title mb-4 text-xl font-bold">Editar Perfil</h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormInput
                    label="Nome"
                    inputProps={{
                        name: "fName",
                        value: formData.fName,
                        onChange: handleChange,
                        placeholder: "Seu nome",
                    }}
                />
                <FormInput
                    label="Sobrenome"
                    inputProps={{
                        name: "lName",
                        value: formData.lName,
                        onChange: handleChange,
                        placeholder: "Seu sobrenome",
                    }}
                />
                <div className="md:col-span-2">
                    <FormInput
                        label="Nome de usuário"
                        inputProps={{
                            name: "username",
                            value: formData.username,
                            onChange: handleChange,
                            placeholder: "@usuario",
                        }}
                    />
                </div>
                <div className="md:col-span-2">
                    <FormInput
                        label="Sobre"
                        textArea
                        textAreaProps={{
                            name: "about",
                            value: formData.about,
                            onChange: handleChange,
                            rows: 4,
                            placeholder: "Conte um pouco sobre você...",
                        }}
                        maxLength={160}
                    />
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
                <Button text="Cancelar" styleType="outlined" onClick={closeModal} />
                <Button text="Confirmar" onClick={handleSubmit} />
            </div>
        </motion.div>
    );
};
