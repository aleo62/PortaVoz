import { useStoreUser } from "@/stores/userStore";
import { IconAlertCircle } from "@tabler/icons-react";
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const NotVerified = () => {
    const { user } = useStoreUser();
    const navigate = useNavigate();

    const sendMail = () => {
        const auth = getAuth();
        return onAuthStateChanged(auth, async (userAuth) => {
            if (userAuth) {
                try {
                    sendEmailVerification(userAuth);
                } catch (err) {
                    console.error("Erro ao enviar e-mail:", err);
                }
            }
        });
    };
    useEffect(() => {
        if(user?.isVerified) navigate("/feed")
        sendMail();
    }, []);

    return (
        <section className="relative flex h-screen flex-col items-center p-3 pt-10">
            <img
                src="https://res.cloudinary.com/di5bma0gm/image/upload/v1761692913/Mail_ajalpe.png"
                alt="Mail"
                className="drop-shadow-accent/10 mb-10 w-lg drop-shadow-xl"
            />
            <h1 className="font-title text-title text-4xl tracking-tight lg:text-6xl">
                Verifique seu E-mail{" "}
            </h1>
            <p className="text-subtitle text-md mt-2 text-center lg:text-xl">
                E-mail de Verificação enviado para{" "}
                <span className="text-title font-medium">{user?.email}</span>
            </p>
            <div className="mt-3 flex items-center text-title justify-center gap-2 rounded-2xl bg-red-400/30 p-3 px-5 text-xs text-red-700 dark:text-red-400 dark:bg-red-700/30 ring-[.7px] ring-red-400 backdrop-blur-sm lg:text-sm">
                <IconAlertCircle size={19} stroke={1.5} />
                <p>
                    Caso não encontre, verifique sua caixa de{" "}
                    <span className="font-medium">Spam</span>
                </p>
            </div>

            <p className="text-md text-title mt-8">
                Não recebeu?{" "}
                <a className="link" onClick={() => sendMail()}>
                    Clique aqui para enviar
                </a>
                .
            </p>

            <span className="bg-accent absolute -top-50 -left-50 -z-2 h-150 w-150 rounded-full opacity-10 blur-3xl dark:mix-blend-color"></span>
            <span className="bg-accent absolute -right-50 bottom-0 -z-2 h-120 w-120 rounded-full opacity-10 blur-3xl dark:mix-blend-color"></span>
            <span className="absolute inset-0 top-1/2 left-1/2 -z-1 h-170 w-170 translate-x-[-50%] translate-y-[-50%] bg-[linear-gradient(to_right,white_2px,transparent_1px),linear-gradient(to_bottom,white_2px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)] bg-[size:55px_55px] bg-[position:-15px_-1px] opacity-20 dark:bg-[linear-gradient(to_right,black_2px,transparent_1px),linear-gradient(to_bottom,black_2px,transparent_1px)] dark:opacity-5"></span>
            <span className="bg-accent absolute top-1/2 left-1/2 -z-2 h-200 w-200 translate-x-[-50%] translate-y-[-50%] rounded-full opacity-10 blur-3xl dark:mix-blend-color"></span>
        </section>
    );
};
