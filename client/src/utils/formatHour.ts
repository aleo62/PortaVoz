export const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - date.getTime(); // Diferença em milissegundos
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 24) {
        if (diffHours >= 1) return `${diffHours}h atrás`;
        if (diffMin >= 1) return `${diffMin}m atrás`;
        return "agora mesmo";
    }

    if (diffDays < 30) {
        return `${diffDays}d atrás`;
    }

    return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};
