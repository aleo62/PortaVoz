import React, { useState } from "react";

import { Button } from "@components/ui/Button";
import { Widgets } from "@components/ui/Widgets";

import { useIsMobile } from "@/hooks/useIsMobile";
import { validateEmail, validateName, validatePassword } from "@/utils/functions/validations";
import { FormInput } from "@components/ui/FormInput";

import { useToast } from "@/contexts/ToastContext";
import { registerUserEmailAndPassword } from "@/firebase/firebaseFunctions";
import { DivideLine } from "@components/ui/DividerLine";
import { GoogleButton } from "@components/ui/GoogleButton";
import { Slides } from "@constants/register";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export const Register = () => {
    const navigate = useNavigate();
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
            <div className="flex h-full bg-white p-2 md:h-screen dark:bg-zinc-900">
                {!isMobile && (
                    <Swiper
                        modules={[Pagination, Scrollbar, A11y, Navigation]}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        className="flex-5 overflow-hidden rounded-3xl"
                        loop={true}
                        autoplay
                    >
                        {Slides.map(({ title, subtitle, image }) => (
                            <SwiperSlide>
                                <div className={`relative h-full bg-cover bg-[url('${image}')]`}>
                                    <div className="absolute bottom-0 flex h-fit flex-row items-center justify-center">
                                        <h1 className="text-title font-title text-center text-4xl">
                                            {title}
                                        </h1>
                                        <p className="text-title text-center text-xl">{subtitle}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                <div className="flex h-full flex-6 flex-col justify-center bg-white p-0 xl:p-7 dark:bg-zinc-900">
                    <form
                        className="relative z-10 w-full max-w-xl space-y-10 self-center bg-white px-3 py-10 md:rounded-3xl md:px-5 md:py-7 lg:px-13 lg:py-0 lg:shadow-none dark:bg-zinc-900"
                        onSubmit={handleRegister}
                    >
                        <h2 className="text-title font-title text-4xl lg:text-5xl">
                            Crie uma conta.
                        </h2>

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
                            className="w-full"
                            isLoading={isLoading}
                        />

                        <DivideLine label="Ou Entre Com" />

                        <div className="space-y-3">
                            <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
                                <GoogleButton />
                                <Widgets>
                                    <img
                                        src={
                                            "https://res.cloudinary.com/di5bma0gm/image/upload/v1759595924/facebook_ry41ii.png"
                                        }
                                        alt=""
                                        width={isMobile ? 20 : 25}
                                    />
                                    <p className="text-sm">Entrar com FaceBook</p>
                                </Widgets>
                            </div>

                            <div className="grid justify-center">
                                <p className="text-title text-sm">
                                    Já tem uma conta?
                                    <a onClick={() => navigate("/auth/login")} className="link">
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
