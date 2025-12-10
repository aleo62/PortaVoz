type ApiErrorPayload = {
    code?: string;
    message?: string;
    status?: number;
    details?: any;
};

const normalizeDetails = (details: any): string | undefined => {
    if (!details) return undefined;
    if (typeof details === "string") return details;
    if (Array.isArray(details)) return details.join(" | ");
    if (typeof details === "object") {
        if (details.message) return details.message;
        try {
            return JSON.stringify(details);
        } catch {
            return String(details);
        }
    }
    return String(details);
};

export const formatApiError = (err: any, fallback = "Erro inesperado.") => {
    console.log(err);
    const payload: ApiErrorPayload | undefined = err?.response?.data;
    const code = payload?.code;
    const message = payload?.message;
    const details = normalizeDetails(payload?.details);

    const defaultMessage = message || details || fallback;

    switch (code) {
        case "INVALID_FORM":
            return `Post inválido: ${details || defaultMessage}`;
        case "USER_NO_REMAINING_REPORTS":
            return `Limite de postagens/denúncias atingido. ${details || defaultMessage}`;
        case "TOO_MANY_REQUESTS":
            return `Muitas requisições. Tente novamente em instantes.`;
        case "ALREADY_VERIFIED":
            return `Conta já verificada.`;
        case "FILE_EXCEDED_LIMIT":
            return `Arquivo de imagem muito grande`
        default:
            return defaultMessage;
    }
};
