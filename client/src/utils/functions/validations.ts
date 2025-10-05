export const validateName = (value: string) => {
    if (value.length < 3) {
        return "Nome e Sobrenome devem ter pelo menos 3 caracteres";
    }
    return null;
};

export const validateEmail = (value: string) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(value)) {
        return "E-mail inválido";
    }
    return null;
};

export const validatePassword = (value: string) => {
    if (value.length < 8) {
        return "Senha deve ter pelo menos 8 caracteres";
    } else if (value.length > 20) {
        return "Senha deve ter no máximo 20 caracteres";
    } else if (!/[A-Z]/.test(value)) {
        return "Senha deve conter pelo menos uma letra maiúscula";
    } else if (!/[0-9]/.test(value)) {
        return "Senha deve conter pelo menos um número";
    }
    return null;
};