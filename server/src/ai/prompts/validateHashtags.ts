import { validateBase } from ".";

export const validateHashtagsPrompt = (title: string, desc: string, hashtags: string[]) =>
    `${validateBase}
    Valide as seguintes hashtags do post:  
    Hashtags: ${hashtags}
    Título: ${title}
    desc: ${desc}

    Regras específicas:  
    - Devem estar relacionadas à denúncia de infraestrutura.
    - Devem estar relacionadas com o titulo e com a descrição
    - Não devem conter termos ofensivos ou que fujam do tema.

    Responda seguindo as regras gerais e no formato JSON.`;
