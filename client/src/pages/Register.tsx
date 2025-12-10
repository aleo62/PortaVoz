import React, { useState } from "react";

import { Button } from "@components/ui/Button";

import { useIsMobile } from "@/hooks/useIsMobile";
import { validateEmail, validateName, validatePassword } from "@/utils/functions/validations";
import { FormInput } from "@components/ui/FormInput";

import { FacebookButton } from "@/components/ui/FacebookButton";
import { portaVozLogo } from "@/constants/system";
import { useToast } from "@/contexts/ToastContext";
import { registerUserEmailAndPassword } from "@/firebase/firebaseFunctions";
import { DivideLine } from "@components/ui/DividerLine";
import { GoogleButton } from "@components/ui/GoogleButton";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const { errorToast } = useToast();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!acceptedTerms) {
            errorToast("Você precisa aceitar os termos de serviço.");
            setIsLoading(false);
            return;
        }

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
            <div className="bg-body-background flex h-full p-2 md:h-screen">
                {!isMobile && (
                    <div
                        className={`relative h-full flex-4 overflow-hidden rounded-2xl bg-cover`}
                        style={{
                            backgroundImage: `url(https://res.cloudinary.com/di5bma0gm/image/upload/v1764962994/3242104_sufxqh.jpg)`,
                        }}
                    >
                        <img
                            src={portaVozLogo(true, true)}
                            alt=""
                            className="absolute top-10 left-10 max-w-10"
                        />
                        <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></span>
                        <div className="absolute bottom-0 p-10 py-20 text-white">
                            <span className="text-lg">Faça a diferença na sua cidade</span>
                            <h1 className="font-title text-3xl">
                                Plataforma onde sua Voz tem vez. Registre-se e ajude a sua cidade a
                                se tornar melhor.
                            </h1>
                        </div>
                    </div>
                )}

                <div className="flex h-full flex-7 flex-col justify-center p-0 xl:p-7">
                    <form
                        className="relative z-10 w-full max-w-[650px] space-y-6 self-center px-2 py-10 md:rounded-3xl md:px-5 md:py-7 lg:space-y-10 lg:py-0"
                        onSubmit={handleRegister}
                    >
                        <h2 className="text-title font-title text-3xl lg:text-5xl">
                            Crie uma conta.
                        </h2>
                        <p className="text-subtitle text-md">
                            Insira seus dados abaixo, e crie sua conta em nossa plataforma.
                        </p>

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
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="text-accent focus:ring-accent mt-1 size-4 rounded border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800"
                                />
                                <label
                                    htmlFor="terms"
                                    className="text-sm text-zinc-600 dark:text-zinc-400"
                                >
                                    Eu concordo com os{" "}
                                    <a
                                        href="/terms-of-service"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:underline"
                                    >
                                        Termos de Serviço
                                    </a>{" "}
                                    e a{" "}
                                    <a
                                        href="/privacy-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent hover:underline"
                                    >
                                        Política de Privacidade
                                    </a>
                                    .
                                </label>
                            </div>
                        </div>
                        <Button
                            styleType="primary"
                            text="Cadastre-se"
                            className="w-full"
                            isLoading={isLoading}
                        />
                    </form>
                    <DivideLine className="my-5 max-w-[650px] mx-auto" label="Ou Entre Com" />

                    <div className="md:px-5 mx-auto mb-3 flex w-full max-w-[650px] flex-col gap-3 px-3 md:grid md:grid-cols-2">
                        <GoogleButton />
                        <FacebookButton />
                    </div>

                    <div className="grid justify-center">
                        <p className="text-title flex items-center gap-1 text-sm">
                            Já tem uma conta?
                            <a onClick={() => navigate("/auth/login")} className="link">
                                Entre aqui
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
