import { ButtonPrimary } from "@/components/Button";
import { CodeInput } from "@/components/CodeInput";
import { useToast } from "@/contexts/ToastContext";
import { db } from "@/firebase";
import logo from "@assets/images/logo/logo-light.png";
import { IconArrowLeft, IconCheck } from "@tabler/icons-react";
import { codeLength } from "@utils/data";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Verify = () => {
    const [code, setCode] = useState(Array(codeLength).fill(""));
    const [isDisabled, setIsDisabled] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();
    const uid = location.state?.uid;
    const email = location.state?.email;
    const { errorToast, successToast } = useToast();
    if (!uid || !email) {
        navigate("/");
        return;
    }

    const handleCode = (index: number, value: string) => {
        const values = value.split("");

        const newCode = [...code];
        newCode[index] = values[0] || "";

        let nextIndex = index + 1;

        if (values.length > 1) {
            for (let i = 1; i < values.length && nextIndex < codeLength; i++) {
                newCode[nextIndex] = values[i];
                nextIndex++;
                document.getElementById(`code-${i}`)?.focus();
            }
        } else {
            if (value && index < codeLength - 1) {
                document.getElementById(`code-${index + 1}`)?.focus();
            }
        }

        setCode(newCode);

        if (code.length >= 5) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const inputCode = code.join("").trim();

        try {
            if (inputCode.length !== codeLength) {
                return;
            }

            const userRef = doc(db, "Users", uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                errorToast("Usuário não encontrado");
                return;
            }

            const userData = userSnap.data();

            if (userData.verified) {
                errorToast("Usuário já verificado");
                return;
            }

            if (Date.now() > userData.expiresAt) {
                errorToast("Código expirado. Solicite um novo.");
                return;
            }

            if (userData.verificationCode !== inputCode) {
                errorToast("Código inválido");
                return;
            }

            await updateDoc(userRef, {
                verified: true,
                verificationCode: null,
                expiresAt: null,
            });

            localStorage.setItem("auth_uid", uid);

            successToast("Usuário cadastrado e verificado com sucesso");

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <header className="mx-auto flex w-full max-w-screen-2xl items-center p-6">
                <div className="">
                    <a
                        className="link flex items-center gap-2 text-lg"
                        onClick={() => window.history.back()}
                    >
                        <IconArrowLeft className="size-[5.5] stroke-[1.5]" />
                        Voltar
                    </a>
                </div>
            </header>

            <form
                onSubmit={handleSubmit}
                className="transparent mb-12 flex flex-col items-center px-2 py-2 md:mb-0 md:min-h-[calc(100vh-theme(spacing.24))]"
            >
                <div className="flex w-fit flex-col items-center justify-center">
                    <img src={logo} alt="" width={120} className="mb-15" />
                    <h1 className="font-title mb-5 text-xl font-normal md:text-[1.7rem]">
                        Código enviado por <span className="font-semibold">E-mail</span>
                    </h1>
                    <p className="text-subtitle md:text-md mb-16 max-w-135 px-2 text-center text-sm">
                        Digite abaixo o código que foi enviado para {email} por e-mail. Isso é
                        necessário para confirmar sua identidade e validar sua conta.
                    </p>
                    <div className="grid grid-cols-5 gap-2 px-2 md:gap-4">
                        {Array.from({ length: codeLength }, (_, index) => (
                            <CodeInput
                                key={index}
                                value={code[index]}
                                onChange={(value) => handleCode(index, value)}
                                onBackspace={() => {
                                    document.getElementById(`code-${index - 1}`)?.focus();
                                }}
                                id={"code-" + index}
                            />
                        ))}
                    </div>
                    <div className="grid w-full justify-end">
                        <ButtonPrimary
                            text="Confirmar"
                            Icon={IconCheck}
                            disabled={isDisabled}
                            className="mt-19"
                        />
                    </div>
                </div>
            </form>

            <footer className="relative mx-auto w-full max-w-screen-2xl px-6 md:absolute md:bottom-0">
                <div className="w-full border-t-1 border-t-zinc-300 py-3 md:py-8">
                    <p className="text-title text-sm">
                        © 2025 PortaVoz, por uma <span className="font-semibold">Piracicaba</span>{" "}
                        melhor. Todos Direitos Reservados
                    </p>
                </div>
            </footer>
        </>
    );
};
