import React, { useState } from "react";

import facebook from "@assets/images/icons/facebook.png";

import { IconArrowRight } from "@tabler/icons-react";

import { Button } from "@/components/ui/Button";
import { Widgets } from "@/components/ui/Widgets";

import blob from "@assets/images/illustrations/register/blob-scene-haikei.png";
import workspace from "@assets/images/illustrations/register/workspace.png";

import { FormInput } from "@/components/ui/FormInput";
import { useIsMobile } from "@/utils/isMobile";
import { validateEmail, validateName, validatePassword } from "@/utils/validations";

import { GoogleButton } from "@/components/ui/GoogleButton";
import { useToast } from "@/contexts/ToastContext";
import { registerUserEmailAndPassword } from "@/firebase/firebaseFunctions";
import { FirebaseError } from "firebase/app";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const { errorToast } = useToast();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const error =
            validateName(fName) ||
            validateName(lName) ||
            validateEmail(email) ||
            validatePassword(password);

        if (error) {
            errorToast(error);
            setIsLoading(false);
            return;
        }

        try {
            await registerUserEmailAndPassword({ email, fName, lName, password });
        } catch (error: unknown) {
            if (error instanceof FirebaseError && error.code === "auth/email-already-in-use") {
                console.log(error);
                errorToast("Este e-mail já está em uso.");
            } else {
                errorToast("Erro ao criar usuário.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const isMobile = useIsMobile();

    return (
        <>
            <div className="flex h-full md:h-screen">
                <div className="from-accent to-primary relative hidden h-full w-4/9 overflow-y-clip bg-gradient-to-r lg:block xl:w-6/16">
                    <div className="relative px-18 pt-40 text-white">
                        <div className="absolute top-43 left-12 flex flex-col items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                            <div className="mt-[-5px] h-50 w-1 bg-gradient-to-b from-white to-transparent"></div>
                        </div>
                        <div className="relative z-10">
                            <h2 className="font-title mb-6 text-4xl font-semibold">
                                Faça a Diferença.
                            </h2>
                            <p className="text-md">
                                Bem-vindo de volta! Acesse sua conta para continuar e aproveitar
                                todos os recursos. Insira suas credenciais abaixo e siga com a sua
                                experiência.
                            </p>
                        </div>
                    </div>

                    <img
                        src={workspace}
                        alt="Workspace"
                        className="absolute right-[-100px] bottom-3 z-10 max-w-none drop-shadow-2xl lg:w-[600px] xl:right-[-200px] xl:w-[680px]"
                    />
                    <div className="absolute top-0 left-0 z-[0] h-full w-full overflow-x-clip">
                        <div className="relative h-full w-full">
                            <img
                                src={blob}
                                alt=""
                                className="absolute top-0 left-0 h-full w-full opacity-[0.05]"
                            />
                            <div className="absolute bottom-[190px] left-[-20px] h-50 w-50 rounded-full bg-white/35 blur-[100px] dark:bg-zinc-950/35" />
                            <div className="absolute right-[20px] bottom-[50px] h-64 w-64 rounded-full bg-white/32 blur-[100px] dark:bg-zinc-950/32" />
                            <div className="absolute top-[-55px] right-[20px] h-64 w-64 rounded-full bg-white/30 blur-[100px] dark:bg-zinc-950/30" />
                        </div>
                    </div>
                </div>

                <div className="bg-accent lg:bg-body-background flex flex-1 flex-col justify-center p-0 xl:p-7">
                    <form
                        className="bg-body-background relative z-10 w-full max-w-xl space-y-10 self-center px-3 py-10 shadow-[0px_4px_37px_-16px_rgba(0,_0,_0,_0.1)] md:rounded-3xl md:px-5 md:py-7 lg:px-13 lg:py-0 lg:shadow-none"
                        onSubmit={handleRegister}
                    >
                        <div className="w-full text-center">
                            <h2 className="text-title font-title text-2xl font-semibold lg:text-3xl">
                                Comece por Aqui.
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    inputProps={{
                                        type: "text",
                                        placeholder: "John",
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFName(e.target.value),
                                    }}
                                    label="Nome"
                                />
                                <FormInput
                                    inputProps={{
                                        type: "text",
                                        placeholder: "Doe",
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                            setLName(e.target.value),
                                    }}
                                    label="Sobrenome"
                                />
                            </div>
                            <FormInput
                                inputProps={{
                                    type: "text",
                                    placeholder: "john@email.com",
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                        setEmail(e.target.value),
                                }}
                                label="E-mail"
                            />
                            <FormInput
                                inputProps={{
                                    type: "password",
                                    placeholder: "••••••••••••••",
                                    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPassword(e.target.value),
                                }}
                                label="Senha"
                            />
                        </div>
                        <Button
                            styleType="primary"
                            text="Cadastre-se"
                            Icon={IconArrowRight}
                            className="w-full"
                            isLoading={isLoading}
                        />

                        <div className="mt-10 flex items-center justify-center gap-2">
                            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></span>
                            <p className="text-sm text-zinc-500 dark:text-zinc-600">Ou cadastre-se com</p>
                            <span className="flex-1 border-t border-zinc-300 dark:border-zinc-700"></span>
                        </div>

                        <div className="space-y-3">
                            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                                <GoogleButton />
                                <Widgets>
                                    <img src={facebook} alt="" width={isMobile ? 20 : 25} />
                                    <p className="text-sm">Entrar com FaceBook</p>
                                </Widgets>
                            </div>

                            <div className="grid justify-center">
                                <p className="text-title text-sm">
                                    Já tem uma conta?
                                    <a href="/auth/login" className="link">
                                        {" "}
                                        Entre aqui
                                    </a>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
