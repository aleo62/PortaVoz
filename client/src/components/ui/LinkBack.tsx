import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const LinkBack = () => {
    const navigate = useNavigate();
    return (
        <a className="text-title flex items-center gap-2 text-md cursor-pointer" onClick={() => navigate(-1)}>
            <IconArrowLeft className="size-6 stroke-[1.5px]" /> Voltar página
        </a>
    );
};
