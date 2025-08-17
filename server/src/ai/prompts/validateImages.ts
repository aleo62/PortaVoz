import { validateBase } from ".";

export const validateContentPrompt = (title: string, desc: string) =>
    `${validateBase}
    Valide o seguinte conteúdo do post:  
    Título: "${title}"  
    Descrição: "${desc}"

    Regras específicas:  
    - Deve estar relacionado a uma denúncia de infraestrutura em Piracicaba.
    - Não deve conter ofensas, palavrões ou temas fora de contexto.

    Responda seguindo as regras gerais e no formato JSON.`;
