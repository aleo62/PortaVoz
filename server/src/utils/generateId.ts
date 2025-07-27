export const generateId = (length: number, preId?: string, posId?: string) => {
    const complementLenght = (preId?.length || 0) + (posId?.length || 0);
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length - complementLenght; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return `${preId || ""}${result}${posId || ""}`;
};
