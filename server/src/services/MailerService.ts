import config from "@/config";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: config.GMAIL_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    logger: true,
    debug: true,
    auth: { user: config.GMAIL_USER, pass: config.GMAIL_PASS },
});

export const sendMail = async (to: string, subject: string, text: string) => {
    try {
        const info = await transporter.sendMail({
            from: config.GMAIL_USER,
            to,
            subject,
            text,
        });

        return info;
    } catch (err) {
        console.error("Erro ao enviar e-mail:", err);
        throw err;
    }
};
