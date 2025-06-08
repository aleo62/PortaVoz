import { Report } from "@/components/Report";

export const Reports = () => {
    return (
        <>
            <Report
                title="Problema na casa do Schiavolin"
                desc="Gostaria de registrar uma denúncia referente à falta e irregularidade no fornecimento de água e energia elétrica na minha região. Estamos enfrentando constantes interrupções no abastecimento de água, o que tem prejudicado diretamente a higiene, a alimentação e as necessidades básicas da população local. Além disso, a energia elétrica apresenta quedas frequentes e instabilidade, colocando em risco aparelhos eletrônicos, a segurança de moradores e até a conservação de alimentos."
                images={[
                    "https://res.cloudinary.com/di5bma0gm/image/upload/v1749068526/caption_fhj5kx.jpg",
                ]}
                tags={["água", "luz"]}
            />
        </>
    );
};
