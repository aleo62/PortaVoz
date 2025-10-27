const bcrypt = require("bcrypt");

export const makeHash = async (content: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashContent = await bcrypt.hash(content, salt);

    return hashContent;
};

export const verifyHash = async (userInput: string, hash: string) => {
    const result = await bcrypt.compare(String(userInput), hash);
    return result;
};
