// src/pages/Login.tsx
import { Border } from "@/components/deco/Border";
import { Circle } from "@/components/deco/Circle";
import { Ret } from "@/components/deco/Ret";
import { Button } from "@/components/general/Button";
import { FormInput } from "@/components/general/FormInput";
import { Loader } from "@/components/general/Loader";
import { InfoFooter } from "@/components/otros/InfoFooter";
import { Widgets } from "@/components/otros/Widgets";
import { useToast } from "@/contexts/ToastContext";
import { auth } from "@/firebase";
import { useIsMobile } from "@/utils/isMobile";
import facebook from "@assets/images/icons/facebook.png";
import google from "@assets/images/icons/google.png";
import portavoz from "@assets/images/logo/logo-light.png";
import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginEmail, setLoginEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isMobile = useIsMobile();
    const { successToast, errorToast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        let errorMessage = "";

        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            successToast("Usuário logado com sucesso!");
        } catch (error: any) {
            if (error.code == "auth/invalid-email" || "auth/missing-password" || "auth/invalid-credential") errorMessage = "E-mail ou Senha Inválidos";
            errorToast("Erro ao logar: " + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = () => {
        setIsLoading(true);

        setTimeout(() => {
            setLoginEmail(!loginEmail);
            setIsLoading(false);
        }, 500);
    };

    return (
        <>
            <Ret className="top-[20px] left-[40px] z-[-1] h-50 w-50 rotate-[125deg] max-md:hidden lg:h-70 lg:w-70" />
            <Border className="top-[230px] right-[70px] z-[-1] h-45 w-45 max-md:hidden lg:h-60 lg:w-60" />
            <Circle className="top-[430px] left-[5px] h-35 w-35 rotate-[-105deg] max-md:hidden lg:left-[160px] lg:h-50 lg:w-50" />

            <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
            <div className="min-h-screen space-y-60 pt-5">
                <div className="mx-auto grid w-full max-w-sm items-center gap-5">
                    <div className="flex flex-col items-center justify-center">
                        <img src={portavoz} alt="PortaVoz" width={114} />
                        <h2 className="font-title text-title mt-3 mb-12 text-center text-xl font-normal md:text-2xl">
                            Acesse sua <span className="font-semibold">Voz</span> pelo{" "}
                            <span className="font-semibold">Portavoz</span>
                        </h2>
                    </div>

                    {loginEmail ? (
                        <>
                            <div className="relative flex w-full flex-col gap-10 px-3 md:px-0">
                                <form action="" onSubmit={handleLogin} className="flex flex-col">
                                    <FormInput
                                        inputProps={{
                                            type: "text",
                                            onChange: (e) => setEmail(e.target.value),
                                            placeholder: "john@email.com",
                                        }}
                                        label="E-mail"
                                        className="mb-5"
                                    />
                                    <FormInput
                                        inputProps={{
                                            type: "password",
                                            onChange: (e) => setPassword(e.target.value),
                                            placeholder: "••••••••••••••",
                                        }}
                                        label="Senha"
                                    />
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <input type="checkbox" name="" id="" />
                                            <p className="text-title text-sm">Lembre-se de mim</p>
                                        </div>
                                        <a href="" className="link text-sm">
                                            Esqueci minha Senha
                                        </a>
                                    </div>

                                    <Button
                                        styleType="primary"
                                        text="Entrar"
                                        className="mt-15 ml-auto w-1/2"
                                        Icon={IconArrowUpRight}
                                        onClick={() => handleLogin}
                                    />
                                </form>
                                <div className="flex items-center justify-center">
                                    <p className="text-title text-sm">
                                        Não tem uma conta?{" "}
                                        <a href="/register" className="link text-sm">
                                            Criar conta
                                        </a>
                                    </p>
                                </div>
                                <div className="cursor-pointer self-center md:absolute md:top-[40%] md:left-[-100px]">
                                    <div
                                        className="transition-background bg-body-background hover:bg-accent transform-y-[-50%] group ring-accent relative h-15 w-15 overflow-clip rounded-full ring-2 duration-200"
                                        onClick={handleChange}
                                    >
                                        <IconArrowLeft
                                            className="transition-color text-accent group-hover:text-body-background absolute top-[50%] left-[50%] size-8 translate-x-[-50%] translate-y-[-50%] stroke-[2] duration-200 group-hover:left-[-15px]"
                                            title="Voltar"
                                        />
                                        <IconArrowLeft
                                            className="transition-color text-accent group-hover:text-body-background absolute top-[50%] right-[-15px] size-8 translate-x-[50%] translate-y-[-50%] stroke-[2] duration-200 group-hover:right-[50%]"
                                            title="Voltar"
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid w-full gap-3 px-2 md:px-0">
                                <Button
                                    styleType="primary"
                                    text="Entrar com E-mail"
                                    Icon={IconArrowUpRight}
                                    className="w-full"
                                    onClick={handleChange}
                                />

                                <Widgets>
                                    <img src={google} alt="" width={isMobile ? 20 : 25} />
                                    <p className="text-sm">Entrar com a Google</p>
                                </Widgets>

                                <Widgets>
                                    <img src={facebook} alt="" width={isMobile ? 20 : 25} />
                                    <p className="text-sm">Entrar com a FaceBook</p>
                                </Widgets>
                            </div>
                        </>
                    )}
                </div>

                <InfoFooter />
            </div>
        </>
    );
};
