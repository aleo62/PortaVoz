// Importa função utilitária para extrair o public_id de uma URL do Cloudinary
import config from "@/config";
import { getPublicId } from "@/utils/getPublicId";
// Importa e configura o SDK do Cloudinary
import { v2 as cloudinary } from "cloudinary";

// Configuração do Cloudinary (substitua por variáveis de ambiente em produção)
cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_KEY,
    api_secret: config.CLOUD_SECRET,
});

/**
 * Faz upload de uma imagem para o Cloudinary.
 * @param filePath Caminho do arquivo local a ser enviad
 * @returns URL segura da imagem hospedada
 */
export async function createImageService(filePath: string): Promise<string> {
    try {
        const request = await cloudinary.uploader.upload(filePath, {
            folder: "posts",
        });
        return request.secure_url;
    } catch (err) {
        return err as string;
    }
}

/**
 * Deleta uma imagem do Cloudinary a partir da URL.
 * @param url URL da imagem a ser removida
 */
export async function deleteImageService(url: string) {
    try {
        // Extrai o public_id da URL para deletar a imagem
        const public_id = getPublicId(url);
        await cloudinary.uploader.destroy(public_id);
        return;
    } catch (err) {
        // Retorna o erro (pode customizar para melhor tratamento)
        return err;
    }
}

/**
 * Deleta uma imagem do Cloudinary a partir da URL.
 * @param filePath Caminho do arquivo local a ser enviado
 * @param url URL da imagem a ser removida
 * @returns URL segura da imagem hospedada
 */
export async function updateImageService(filePath: string, url: string) {
    try {
        await deleteImageService(url);
        const request = await createImageService(filePath);

        return request;
    } catch (err) {
        // Retorna o erro (pode customizar para melhor tratamento)
        return err;
    }
}
