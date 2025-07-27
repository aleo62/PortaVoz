/**
 * Extrai o public_id de uma URL do Cloudinary.
 * @param url URL completa da imagem
 * @returns public_id extraído da URL
 */
export function getPublicId(url: string) {
    url = url.split("?")[0];

    const parts = url.split("/upload/");
    if (parts.length < 2) throw Error("Invalid URL");

    let path = parts[1].replace(/^v\d+\//, "");
    path = path.replace(/\.[^/.]+$/, "");

    return path;
}
