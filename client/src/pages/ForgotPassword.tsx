import { useToast } from "@/contexts/ToastContext";
import { auth } from "@/firebase";
import { AuthPageTemplate } from "@components/templates/AuthPageTemplate";
import { Button } from "@components/ui/Button";
import { DivideLine } from "@components/ui/DividerLine";
import { FormInput } from "@components/ui/FormInput";
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
            // @ts-ignore
            errorToast(err.message);
        }
        setIsLoading(false);
    };

    return (
        <>
            <AuthPageTemplate
                title={"Informe E-mail"}
                subtitle={"Informe seu E-mail para enviarmos para ele seu link de autenticação."}
            >
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-3 md:px-0">
                    <FormInput
                        inputProps={{
                            type: "email",
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "john@email.com",
                            value: email,
                        }}
                        label="E-mail"
                    />
                    <DivideLine></DivideLine>
                    <div className="grid grid-cols-2 gap-3 pb-2 lg:gap-5">
                        <Button
                            text="Cancelar"
                            styleType="outlined"
                            onClick={() => navigate("/logout")}
                            type="button"
                        />
                        <Button text="Continuar" type="submit" isLoading={isLoading} />
                    </div>
                </form>
            </AuthPageTemplate>
        </>
    );
};
