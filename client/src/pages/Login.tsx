import { AuthPageTemplate } from "@/components/templates/AuthPageTemplate";
import { Button } from "@/components/ui/Button";
import { DivideLine } from "@/components/ui/DividerLine";
import { FacebookButton } from "@/components/ui/FacebookButton";
import { FormInput } from "@/components/ui/FormInput";
import { GoogleButton } from "@/components/ui/GoogleButton";
import { useToast } from "@/contexts/ToastContext";
import { auth } from "@/firebase";
import { useStoreUser } from "@/stores/userStore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { setIsLoadingUser } = useStoreUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { successToast, errorToast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoadingUser(true);
        let errorMessage = "";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            successToast("Usuário logado com sucesso!");
        } catch (error: any) {
            if (
                error.code === "auth/invalid-email" ||
                error.code === "auth/missing-password" ||
                error.code === "auth/invalid-credential"
            ) {
                errorMessage = "E-mail ou Senha Inválidos";
            }
            errorToast("Erro ao logar: " + errorMessage);
        } finally {
            setIsLoadingUser(false);
        }
    };

    return (
        <>
            <AuthPageTemplate
                title="Bem Vindo de Volta"
                subtitle="Que bom te ver aqui de novo! Insira seus dados."
            >
                <div className="relative z-100 grid grid-cols-2 gap-3 mt-10">
                    <GoogleButton small />
                    <FacebookButton small />
                </div>

                <DivideLine label="Ou" />

                <form action="" onSubmit={handleLogin} className="flex flex-col ">
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
                        <a
                            onClick={() => navigate("/auth/forgot-password")}
                            className="link text-sm"
                        >
                            Esqueci minha Senha
                        </a>
                    </div>

                    <Button
                        styleType="primary"
                        text="Entrar com Email"
                        className="mt-12 ml-auto w-full"
                        onClick={() => handleLogin}
                    />
                </form>

                <p className="text-title mt-3 flex items-center justify-center gap-1 text-sm pb-3">
                    <span>Não tem uma conta ainda?</span>
                    <a onClick={() => navigate("/auth/register")} className="link text-sm">
                        Criar conta
                    </a>
                </p>
            </AuthPageTemplate>
        </>
    );
};
