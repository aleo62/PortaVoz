import emailjs from "@emailjs/browser";

type EmailProps = {
    email: string;
    passcode: string;
    time: string;
};

export const sendVerificationEmail = async ({ email, passcode, time }: EmailProps) => {
    try {
        await emailjs.send(
            "service_pv92dub",
            "template_fwqvfjb",
            {
                email,
                passcode,
                time,
            },
            "IhX50-jm3TyoYjxz0",
        );
    } catch (error) {
        console.error("Error to send email:", error);
    }
};
