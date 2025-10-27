import config from "@/config";
import { AppError } from "@/errors/AppError";
import User from "@/models/User.model";
import { generateId } from "@/utils/generateId";
import { getAuth } from "firebase-admin/auth";
import { makeHash, verifyHash } from "./CryptoService";
import { sendMail } from "./MailerService";

export const sendVerificationCode = async (
    userId: string,
    userEmail: string
) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not exists.");

    const now = new Date();
    if (
        user.meta.authCode!.attemptsRemaining! <= 0 &&
        user.meta.authCode!.attemptsResetAt! > now
    ) {
        throw new AppError("Too many requests, try again later.", 429);
    } else if (user.meta.authCode!.attemptsResetAt! < now) {
        user.meta.authCode!.attemptsRemaining = 3;
    }

    const code = generateId(
        config.SYSTEM_CODE_VERIFICATION_LENGTH,
        "",
        "",
        true
    );
    const codeHash = await makeHash(code);

    const codeExpiresAt = new Date(now.getTime() + 15 * 60 * 1000);
    const attemptsResetAt = new Date(now.getTime() + 30 * 60 * 1000);

    user.meta.authCode!.codeHash = codeHash;
    user.meta.authCode!.codeExpiresAt = codeExpiresAt;
    user.meta.authCode!.attemptsResetAt = attemptsResetAt;
    user.meta.authCode!.attemptsRemaining = Math.max(
        (user.meta.authCode!.attemptsRemaining ?? 3) - 1,
        0
    );
    await user.save();

    await sendMail(
        userEmail,
        "Código de Verificação",
        `Seu código de verificação de conta é: <strong>${code}</strong>`
    );
};

export const verifyVerificationCode = async (
    userId: string,
    userInput: string
) => {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not exists.");

    const now = new Date();
    if (user.meta.authCode!.codeExpiresAt! < now)
        return { message: "Code expired.", result: false };

    const result = await verifyHash(userInput, user?.meta.authCode?.codeHash!);

    if (result) {
        getAuth().updateUser(userId, { emailVerified: true });
        await user.updateOne({ $unset: { "meta.authCode": "" } });
        return { message: "Code is both.", result };
    } else {
        return { message: "Code is wrong.", result };
    }
};
