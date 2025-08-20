import { validateBase } from ".";

export const validateImagePrompt = (title: string, desc: string) =>
    `${validateBase}
    Valide o seguinte conteúdo do post:  
    Título: "${title}"  
    Descrição: "${desc}"
    Imagem: imagem inserida junto com a requisição

    Regras específicas:  
    - Deve estar relacionado a uma denúncia de infraestrutura em Piracicaba.
    - Não deve conter ofensas, palavrões ou temas fora de contexto.
    - Não deve conter nudez, violência, ou qualquer outra coisa que infrinja os direitos humanos.
    - A imagem deve estar relacionada diretamente ao conteudo do post, título e descrição.

    Responda seguindo as regras gerais e no formato JSON, apenas mande mensagem de error relacionada a imagem.`;
