import { AuthPageTemplate } from "@/components/templates/AuthPageTemplate";
import { Button } from "@/components/ui/Button";
import { DivideLine } from "@/components/ui/DividerLine";
import { FormInput } from "@/components/ui/FormInput";
import { useToast } from "@/contexts/ToastContext";
import { auth } from "@/firebase";
import { useStoreUser } from "@/stores/userStore";
import { IconCircleCheck } from "@tabler/icons-react";
import { applyActionCode, confirmPasswordReset, reload } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Verify = () => {
    const userAuth = auth.currentUser;
    const { updateUser } = useStoreUser();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const { errorToast, successToast } = useToast();

    const navigate = useNavigate();
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    useEffect(() => {
        if (!oobCode) {
            navigate("/auth/login");
        }
        const verifyEmail = async () => {
            if (userAuth && mode == "verifyEmail") {
                await reload(userAuth!);
                await applyActionCode(auth, oobCode!);

                await updateUser({ isVerified: true });
            }
        };

        verifyEmail();
    }, [userAuth]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            errorToast("Preencha todos os campos");
            return;
        }
        if (password !== confirmPassword) {
            errorToast("As senhas não coincidem");
            return;
        }

        setIsLoading(true);

        try {
            await confirmPasswordReset(auth, oobCode!, password);
            successToast("Senha redefinida com sucesso!");
            navigate("/auth/login");
        } catch (err: any) {
            errorToast(err.message || "Erro ao redefinir senha");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AuthPageTemplate
                title={mode == "resetPassword" ? "Redefinir Senha" : "Autenticar Conta"}
                subtitle={mode == "resetPassword" ? "Redefina a Senha de sua Conta" : ""}
            >
                {mode === "resetPassword" ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-3 md:px-0">
                        <FormInput
                            inputProps={{
                                type: "password",
                                onChange: (e) => setPassword(e.target.value),
                                placeholder: "••••••••",
                                value: password,
                            }}
                            label="Nova Senha"
                        />

                        <FormInput
                            inputProps={{
                                type: "password",
                                onChange: (e) => setConfirmPassword(e.target.value),
                                placeholder: "••••••••",
                                value: confirmPassword,
                            }}
                            label="Confirmar Senha"
                        />
                        <DivideLine></DivideLine>

                        <div className=" grid grid-cols-2 gap-3 pb-2 lg:gap-5">
                            <Button
                                text="Cancelar"
                                styleType="outlined"
                                onClick={() => navigate("/logout")}
                                type="button"
                                isLoading={isLoading}
                            />
                            <Button text="Continuar" type="submit" />
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="my-10 flex items-center justify-center gap-2 text-green-500">
                            <IconCircleCheck size={38} stroke={1.5} />{" "}
                            <p className="text-2xl">Verificado com Sucesso</p>
                        </div>
                        <DivideLine></DivideLine>
                        <div className="grid grid-cols-2 gap-3 pb-2 lg:gap-5">
                            <Button
                                text="Cancelar"
                                styleType="outlined"
                                onClick={() => navigate("/logout")}
                                isLoading={isLoading}
                            />
                            <Button text="Continuar" onClick={() => navigate("/feed")} />
                        </div>
                    </>
                )}
            </AuthPageTemplate>
        </>
    );
};
