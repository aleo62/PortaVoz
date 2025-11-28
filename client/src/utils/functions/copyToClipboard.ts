export const copyToClipboard = async (text: string, message: string, sucessToast: any) => {
    await navigator.clipboard.writeText(text);
    sucessToast(message);
};
