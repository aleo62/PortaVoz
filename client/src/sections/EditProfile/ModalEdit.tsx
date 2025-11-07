import { EditModal } from "@/components/ui/EditModal";
import { FormInput } from "@/components/ui/FormInput";
import { useModal } from "@/contexts/ModalContext";
import { IconArrowRight, IconEdit } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { PreviewUser } from "./ViewProfile";
import { Button } from "@/components/ui/Button";

type ModalEditProps = {
    previewUser: PreviewUser;
    setPreviewUser: Dispatch<SetStateAction<PreviewUser>>;
    cancel: () => void;
    save: () => void
};

export const ModalEdit = ({ previewUser, setPreviewUser, cancel, save }: ModalEditProps) => {
    const { closeModal } = useModal();

    return (
        <EditModal title="Editar Perfil" Icon={IconEdit} onClose={closeModal}>
            <div className="space-y-5 p-5">
                <FormInput
                    inputProps={{
                        placeholder: "Nome",
                        type: "text",
                        value: previewUser?.fName,
                        onChange: (e) =>
                            setPreviewUser({
                                ...previewUser!,
                                fName: e.target.value,
                            }),
                    }}
                    label="Nome"
                    className="z-100"
                />
                <FormInput
                    inputProps={{
                        placeholder: "Sobrenome",
                        type: "text",
                        value: previewUser?.lName,
                        onChange: (e) =>
                            setPreviewUser({
                                ...previewUser!,
                                lName: e.target.value,
                            }),
                    }}
                    label="Sobrenome"
                />
                <FormInput
                    inputProps={{
                        placeholder: "Username",
                        type: "text",
                        value: previewUser?.username,
                        onChange: (e) =>
                            setPreviewUser({
                                ...previewUser!,
                                username: e.target.value,
                            }),
                    }}
                    label="Username"
                />
                <div className="mt-20 flex flex-col-reverse items-start gap-2 lg:flex-row lg:items-center lg:justify-end">
                    <Button
                        styleType="outlined"
                        text="Cancelar"
                        size="small"
                        onClick={cancel}
                    />
                    <Button
                        styleType="primary"
                        text="Salvar"
                        size="small"
                        Icon={IconArrowRight}
                        onClick={save}
                    />
                </div>
            </div>
        </EditModal>
    );
};
