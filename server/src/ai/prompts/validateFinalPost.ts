import { validateBase } from ".";

export const validateFinalPostPrompt = (
    title: string,
    desc: string,
    hashtags: string[]
) => {
    const formattedHashtags =
        Array.isArray(hashtags) && hashtags.length
            ? hashtags.join(", ")
            : "Nenhuma hashtag fornecida";

    return `${validateBase}
    Analise o post completo a seguir e verifique se Título, Descrição, Hashtags e Imagens se referem à mesma denúncia de infraestrutura em Piracicaba/SP.

    Título: "${title}"
    Descrição: "${desc}"
    Hashtags: ${formattedHashtags}
    Imagens: serão enviadas junto com esta solicitação.

    Regras específicas:
    - Todas as partes do conteúdo devem ser coerentes entre si e com a denúncia.
    - Rejeite se qualquer item estiver fora do contexto de infraestrutura ou contiver linguagem ofensiva.
    - Aponte se uma imagem não corresponder ao título/descrição ou mostrar conteúdo inapropriado.
    - Sempre que possível sugira uma correção breve.

    Responda seguindo as regras gerais e obrigatoriamente no formato JSON.`;
};
