import { IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type Question = {
    question: string;
    answer: string;
};

type Topic = {
    id: string;
    title: string;
    content: React.ReactNode;
    questions: Question[];
};

const privacyData: Topic[] = [
    {
        id: "intro",
        title: "1. Introdução",
        content: (
            <p>
                A sua privacidade é importante para nós. É política do PortaVoz respeitar a sua
                privacidade em relação a qualquer informação sua que possamos coletar no site
                PortaVoz, e outros sites que possuímos e operamos.
            </p>
        ),
        questions: [],
    },
    {
        id: "coleta",
        title: "2. Coleta de Informações",
        content: (
            <p>
                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe
                fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e
                consentimento. Também informamos por que estamos coletando e como será usado.
            </p>
        ),
        questions: [
            {
                question: "Que informações coletamos?",
                answer: "Coletamos informações pessoais que você nos fornece voluntariamente ao se registrar, como nome, e-mail e foto de perfil. Também coletamos dados de uso e interações dentro da plataforma para melhorar sua experiência.",
            },
            {
                question: "Por que coletamos esses dados?",
                answer: "Utilizamos seus dados para personalizar sua experiência, permitir interações sociais, garantir a segurança da comunidade e enviar notificações relevantes sobre suas atividades.",
            },
        ],
    },
    {
        id: "retencao",
        title: "3. Retenção de Dados",
        content: (
            <p>
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o
                serviço solicitado. Quando armazenamos dados, protegemos dentro de meios
                comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso,
                divulgação, cópia, uso ou modificação não autorizados.
            </p>
        ),
        questions: [
            {
                question: "Meus dados estão seguros?",
                answer: "Adotamos medidas de segurança comercialmente aceitáveis para proteger seus dados contra perdas, roubos e acesso não autorizado. No entanto, nenhum método de transmissão pela internet é 100% seguro.",
            },
            {
                question: "Por quanto tempo mantemos seus dados?",
                answer: "Mantemos suas informações apenas pelo tempo necessário para fornecer nossos serviços. Você pode solicitar a exclusão de sua conta e dados a qualquer momento.",
            },
        ],
    },
    {
        id: "compartilhamento",
        title: "4. Compartilhamento de Dados",
        content: (
            <p>
                Não compartilhamos informações de identificação pessoal publicamente ou com
                terceiros, exceto quando exigido por lei.
            </p>
        ),
        questions: [
            {
                question: "Com quem compartilhamos?",
                answer: "Não compartilhamos suas informações pessoais publicamente ou com terceiros, exceto quando exigido por lei ou para proteger nossos direitos e segurança.",
            },
            {
                question: "Como usamos seus dados?",
                answer: "Seus dados são usados para operar e manter o PortaVoz, processar suas denúncias e interações, e comunicar novidades. Não vendemos seus dados para terceiros.",
            },
        ],
    },
    {
        id: "compromisso",
        title: "5. Compromisso do Usuário",
        content: (
            <>
                <p>
                    O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o
                    PortaVoz oferece no site e com caráter enunciativo, mas não limitativo:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>
                        A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a
                        à ordem pública;
                    </li>
                    <li>
                        B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica,
                        jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao
                        terrorismo ou contra os direitos humanos;
                    </li>
                    <li>
                        C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares)
                        do PortaVoz, de seus fornecedores ou terceiros, para introduzir ou
                        disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou
                        software que sejam capazes de causar danos anteriormente mencionados.
                    </li>
                </ul>
            </>
        ),
        questions: [
            {
                question: "O que é esperado de mim?",
                answer: "Esperamos que você use o PortaVoz de forma ética e legal. Não toleramos conteúdo ofensivo, discurso de ódio, ou qualquer atividade que viole nossos termos de uso ou a lei vigente.",
            },
            {
                question: "O que acontece se eu violar as regras?",
                answer: "Violações podem resultar na suspensão ou banimento de sua conta, dependendo da gravidade da infração. Reservamo-nos o direito de remover conteúdo inadequado.",
            },
        ],
    },
    {
        id: "mais-infos",
        title: "6. Mais Informações",
        content: (
            <p>
                Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo
                que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os
                cookies ativados, caso interaja com um dos recursos que você usa em nosso site.
            </p>
        ),
        questions: [],
    },
];

const AccordionItem = ({ item }: { item: Question }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-zinc-200 last:border-none dark:border-zinc-800">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:text-accent flex w-full items-center justify-between py-4 text-left font-medium text-zinc-800 transition-colors dark:text-zinc-200"
            >
                <span>{item.question}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <IconChevronDown className="size-5 text-zinc-500" />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const PrivacyPolicy = () => {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <section className="gap-12 px-6 py-12">
                <div className="my-10 border-b border-zinc-200 py-17 text-center dark:border-zinc-800">
                    <h1 className="text-title font-title text-3xl font-medium dark:text-zinc-100">
                        Política de Privacidade
                    </h1>
                    <p className="text-subtitle mx-auto mt-2 max-w-lg text-sm">
                        Entenda como coletamos, usamos e protegemos suas informações no PortaVoz.
                        Sua transparência e segurança são nossa prioridade.
                    </p>
                </div>
                <div className="mx-auto flex w-full max-w-6xl gap-6">
                    <aside className="hidden h-fit w-64 shrink-0 lg:sticky lg:top-20 lg:block">
                        <nav className="space-y-3 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                            {privacyData.map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => scrollToSection(topic.id)}
                                    className="hover:text-accent dark:hover:text-accent block w-full text-left text-sm font-medium text-zinc-500 transition-colors dark:text-zinc-400"
                                >
                                    {topic.title}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    <div className="flex-1">
                        <div className="space-y-12">
                            {privacyData.map((topic) => (
                                <section key={topic.id} id={topic.id} className="scroll-mt-24">
                                    <h2 className="font-title mb-4 text-lg text-zinc-900 dark:text-zinc-100">
                                        {topic.title}
                                    </h2>
                                    <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-6 dark:border-zinc-800 dark:bg-zinc-900/50">
                                        <div className="mb-6 text-zinc-700 dark:text-zinc-300">
                                            {topic.content}
                                        </div>

                                        {topic.questions.length > 0 && (
                                            <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
                                                {topic.questions.map((q, i) => (
                                                    <AccordionItem key={i} item={q} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </section>
                            ))}
                        </div>

                        <div className="mt-12 text-center text-sm text-zinc-500">
                            <p>Última atualização: Dezembro de 2025</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
