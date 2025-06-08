import { IconCheck } from "@tabler/icons-react";
import { PieProgress } from "./PieProgress";

export const ProgressProfile = () => {
    return (
        <div className="hidden h-fit w-full max-w-[230px] items-center rounded-xl bg-white p-8 shadow-[0px_4px_55px_-19px_rgba(0,_0,_0,_0.1)] lg:grid">
            <PieProgress percentage={70} className="justify-self-center" />

            <div className="mt-10 grid gap-4 text-sm text-zinc-600">
                <p className="flex gap-2 text-green-600">
                    <IconCheck size={15} />
                    Criar perfil <span>30%</span>
                </p>
                <p className="flex gap-2 text-green-600">
                    <IconCheck size={15} /> Foto de perfil <span>20%</span>
                </p>
                <p className="flex gap-2">
                    <IconCheck size={15} /> Banner <span>10%</span>
                </p>
                <p className="flex gap-2 text-green-600">
                    <IconCheck size={15} /> Biografia <span>20%</span>
                </p>
                <p className="flex gap-2">
                    <IconCheck size={15} /> Telefone <span>20%</span>
                </p>
            </div>
        </div>
    );
};
