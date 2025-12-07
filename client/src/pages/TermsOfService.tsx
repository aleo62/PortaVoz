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

const termsData: Topic[] = [
    {
        id: "aceitacao",
        title: "1. Aceitação dos Termos",
        content: (
            <p>
                Ao acessar e usar o PortaVoz, você concorda em cumprir e ficar vinculado aos
                seguintes termos e condições de uso. Se você não concordar com qualquer parte destes
                termos, você não deve acessar ou usar nosso serviço.
            </p>
        ),
        questions: [
            {
                question: "O que acontece se eu não aceitar?",
                answer: "Se você não concordar com estes termos, infelizmente não poderá utilizar os serviços do PortaVoz, pois eles regem a relação entre a plataforma e seus usuários.",
            },
        ],
    },
    {
        id: "uso",
        title: "2. Uso do Serviço",
        content: (
            <p>
                Você concorda em usar o PortaVoz apenas para fins legais e de uma maneira que não
                infrinja os direitos de, restrinja ou iniba o uso e aproveitamento do serviço por
                qualquer terceiro. Comportamento proibido inclui assediar ou causar angústia ou
                inconveniência a qualquer pessoa, transmitir conteúdo obsceno ou ofensivo ou
                interromper o fluxo normal de diálogo dentro do PortaVoz.
            </p>
        ),
        questions: [
            {
                question: "Posso postar qualquer coisa?",
                answer: "Não. Conteúdos ilegais, discurso de ódio, nudez explícita, violência gratuita ou qualquer material que viole direitos autorais são estritamente proibidos.",
            },
            {
                question: "Idade mínima?",
                answer: "Você deve ter pelo menos 13 anos (ou a idade mínima legal em seu país) para criar uma conta no PortaVoz.",
            },
        ],
    },
    {
        id: "conta",
        title: "3. Contas de Usuário",
        content: (
            <p>
                Para acessar certos recursos do PortaVoz, você pode ser solicitado a criar uma
                conta. Você é responsável por manter a confidencialidade de suas informações de
                login e por todas as atividades que ocorrem em sua conta.
            </p>
        ),
        questions: [
            {
                question: "Posso compartilhar minha conta?",
                answer: "Não recomendamos o compartilhamento de contas. Você é o único responsável por tudo o que acontece através do seu perfil.",
            },
            {
                question: "Como excluo minha conta?",
                answer: "Você pode solicitar a exclusão da sua conta a qualquer momento através das configurações do seu perfil ou entrando em contato com o suporte.",
            },
        ],
    },
    {
        id: "conteudo",
        title: "4. Conteúdo do Usuário",
        content: (
            <p>
                Ao postar conteúdo no PortaVoz, você concede a nós uma licença não exclusiva,
                transferível, sublicenciável, livre de royalties e mundial para usar, armazenar,
                exibir, reproduzir, modificar, criar obras derivadas, executar e distribuir seu
                conteúdo no PortaVoz.
            </p>
        ),
        questions: [
            {
                question: "O conteúdo ainda é meu?",
                answer: "Sim, você mantém os direitos de propriedade sobre o conteúdo que cria, mas nos dá permissão para mostrá-lo na plataforma.",
            },
        ],
    },
    {
        id: "modificacoes",
        title: "5. Modificações dos Termos",
        content: (
            <p>
                O PortaVoz reserva-se o direito de alterar estes termos a qualquer momento.
                Recomendamos que você revise esta página periodicamente para quaisquer alterações.
                Seu uso continuado do site após a publicação de alterações constituirá sua aceitação
                dessas alterações.
            </p>
        ),
        questions: [
            {
                question: "Serei avisado de mudanças?",
                answer: "Faremos o possível para notificar os usuários sobre mudanças significativas nos termos, geralmente através de um aviso na plataforma ou por e-mail.",
            },
        ],
    },
    {
        id: "responsabilidade",
        title: "6. Limitação de Responsabilidade",
        content: (
            <p>
                O PortaVoz é fornecido "como está" e "conforme disponível". Não garantimos que o
                serviço será ininterrupto ou livre de erros. Em nenhuma circunstância o PortaVoz
                será responsável por quaisquer danos diretos, indiretos, incidentais ou consequentes
                decorrentes do uso ou incapacidade de usar o serviço.
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

export const TermsOfService = () => {
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
                        Termos de Serviço
                    </h1>
                    <p className="text-subtitle mx-auto mt-2 max-w-lg text-sm">
                        Leia atentamente nossos termos e condições para entender seus direitos e
                        responsabilidades ao usar o PortaVoz.
                    </p>
                </div>
                <div className="mx-auto flex w-full max-w-6xl gap-6">
                    <aside className="hidden h-fit w-64 shrink-0 lg:sticky lg:top-20 lg:block">
                        <nav className="space-y-3 border-l border-zinc-200 pl-4 dark:border-zinc-800">
                            {termsData.map((topic) => (
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
                            {termsData.map((topic) => (
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
