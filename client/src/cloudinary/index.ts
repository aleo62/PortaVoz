import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "di5bma0gm",
    api_key: "764356265429672",
    api_secret: "vRjDXQxKSFtPUO2_j15E4NkZJKw",
});
export const deleteImageFromCloudinary = async (publicId: string) => {
    try {
        await cloudinary.v2.uploader.destroy(publicId);
    } catch (error) {
        console.error("Erro ao deletar imagem:", error);
        throw error;
    }
};
