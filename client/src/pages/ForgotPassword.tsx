// src/pages/ForgotPassword.tsx
import { Border } from "@/components/deco/Border";
import { Circle } from "@/components/deco/Circle";
import { Ret } from "@/components/deco/Ret";
import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { InfoFooter } from "@/components/ui/InfoFooter";
import { useToast } from "@/contexts/ToastContext";
import { auth } from "@/firebase";
import { portaVozLogo } from "@/utils/data";
import { IconArrowLeft, IconArrowUpRight } from "@tabler/icons-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { errorToast, successToast } = useToast();

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            errorToast("E-mail necessário");
            return;
        }

        setIsLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            successToast("E-mail enviado!");
        } catch (err) {
            errorToast(err as string);
        }
        setIsLoading(false);
    };

    return (
        <>
            <Ret className="top-[-10px] left-[90px] z-[-1] h-50 w-50 rotate-[125deg] max-md:hidden lg:h-70 lg:w-70" />
            <Border className="top-[230px] right-[70px] z-[-1] h-45 w-45 max-md:hidden lg:h-60 lg:w-60" />
            <Circle className="top-[430px] left-[5px] h-35 w-35 rotate-[-105deg] max-md:hidden lg:left-[160px] lg:h-50 lg:w-50" />

            <div className="min-h-screen space-y-60 pt-5">
                <div className="mx-auto grid w-full max-w-sm items-center gap-5">
                    <div className="flex flex-col items-center justify-center">
                        <img src={portaVozLogo} alt="PortaVoz" width={150} />
                        <h2 className="font-title text-title mt-3 mb-12 text-center text-xl font-normal md:text-2xl">
                            Recuperar <span className="font-semibold">Senha</span>
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-3 md:px-0">
                        <FormInput
                            inputProps={{
                                type: "email",
                                onChange: (e) => setEmail(e.target.value),
                                placeholder: "john@email.com",
                                value: email,
                            }}
                            label="E-mail"
                        />

                        <div className="mt-15 flex items-center justify-between">
                            <a
                                onClick={() => navigate("/auth/login")}
                                className="link flex items-center gap-1 text-sm"
                            >
                                <IconArrowLeft className="size-4" />
                                Voltar ao Login
                            </a>
                            <Button
                                styleType="primary"
                                text="Enviar"
                                className="ml-auto w-fit"
                                Icon={IconArrowUpRight}
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                                isLoading={isLoading}
                            />
                        </div>
                    </form>
                </div>

                <InfoFooter />
            </div>
        </>
    );
};
