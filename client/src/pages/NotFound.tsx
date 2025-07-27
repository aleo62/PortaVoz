import { Button } from "@/components/general/Button";
import error from "@assets/images/illustrations/notfound/404.png";
import { IconArrowRight } from "@tabler/icons-react";

export const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center gap-2 p-10">
            <img src={error} alt="" width={1000} />
            <div className="flex flex-col items-center justify-center text-center">
                <h3 className="text-title h-fit text-3xl font-semibold tracking-wider">
                    Página Não Encontrada
                </h3>
                <p className="text-subtitle text-md mt-2">
                    A página que vocês procurava pode ter sido movida ou removida.
                </p>
                <Button
                    styleType="primary"
                    text="Voltar para o Início"
                    path="/"
                    className="mt-5"
                    Icon={IconArrowRight}
                    small
                />
            </div>
        </div>
    );
};
