export const copyToClipboard = async (text: string, message: string, sucessToast: any) => {
    try {
        await navigator.clipboard.writeText(text);
        sucessToast(message);
    } catch (err) {
        console.log("Falha ao copiar o texto", err);
    }
};
