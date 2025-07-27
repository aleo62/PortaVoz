import rateLimit from "express-rate-limit";

// Configuração de rate limit: limita 60 requisições por minuto por IP
const limit = rateLimit({
    windowMs: 60 * 1000, // 1 minuto
    max: 60, // máximo de 60 requisições por janela
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        error: "Too many requests, please try again later.",
    },
});

export default limit;
