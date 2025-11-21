import { Button } from "@components/ui/Button";
import { IconArrowRight } from "@tabler/icons-react";

export const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center gap-2 p-10">
            <img
                src="https://res.cloudinary.com/di5bma0gm/image/upload/v1756564874/404_ugtt27.png"
                alt="404"
                width={1000}
            />
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
                    size="small"
                />
            </div>
        </div>
    );
};
