import { Server } from "@/api/Server";
import { AuthPageTemplate } from "@/components/templates/AuthPageTemplate";
import { Button } from "@/components/ui/Button";
import { CodeInput } from "@/components/ui/CodeInput";
import { useStoreUser } from "@/stores/userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NotVerified = () => {
    const navigate = useNavigate();
    const [codeInput, setCodeInput] = useState<string[]>(["", "", "", ""]);
    const { user } = useStoreUser();

    const handleResend = async () => {
        try {
            await Server.sendVerificationCode(user?.token!);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async () => {
        try {
            const data = await Server.verifyVerificationCode(
                user?.token!,
                codeInput.join("").substring(0, 4),
            );
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AuthPageTemplate
            title="Verificação de E-mail"
            subtitle={
                <>
                    Mandandos código para{" "}
                    <span className="text-title font-medium">{user?.email}</span>
                </>
            }
        >
            <div className="my-10 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((key) => (
                    <CodeInput
                        id={String(key)}
                        value={codeInput[key - 1]}
                        onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            setTimeout(() => {
                                if (v.length > 1) {
                                    setCodeInput((prev) => {
                                        const prevArray = [...prev];
                                        v.split("").map((input, index) => {
                                            const mainIndex = key - 1 + index;
                                            prevArray[mainIndex] = input;
                                            document.getElementById(String(mainIndex + 2))?.focus();
                                        });
                                        return prevArray;
                                    });
                                } else {
                                    setCodeInput((prev) => {
                                        const prevArray = [...prev];
                                        prevArray[key - 1] = v;
                                        return prevArray;
                                    });
                                }
                                if (!codeInput[key - 1] && v)
                                    document.getElementById(String(key + 1))?.focus();
                            }, 20);
                        }}
                        onKeyDown={(e) => {
                            setTimeout(() => {
                                if (e.key === "Backspace" && !codeInput[key - 1]) {
                                    document.getElementById(String(key - 1))?.focus();
                                }
                            }, 10);
                        }}
                        autoComplete="off"
                        placeholder="-"
                    />
                ))}
            </div>

            <p className="mx-auto w-fit pb-8 text-sm">
                Não recebeu o código?{" "}
                <a onClick={() => handleResend()} className="link">
                    Clique aqui.
                </a>
            </p>

            <div className="grid grid-cols-2 gap-3 border-t-[1.7px] border-zinc-200 pt-8 pb-2 lg:gap-5">
                <Button text="Cancelar" styleType="outlined" onClick={() => navigate("/logout")} />
                <Button text="Verificar" onClick={() => handleSubmit()} />
            </div>
        </AuthPageTemplate>
    );
};
