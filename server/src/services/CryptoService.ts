import crypto from "crypto";

export const makeHash = async (value: string) => {
    return crypto.createHash("sha256").update(value).digest("hex");
};

export const verifyHash = async (value: string, hash: string) => {
    const valueHash = await makeHash(value);
    return valueHash === hash;
};
