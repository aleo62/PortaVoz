import config from "@/config";
import { getPublicId } from "@/utils/getPublicId";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: config.CLOUD_NAME,
    api_key: config.CLOUD_KEY,
    api_secret: config.CLOUD_SECRET,
});

export const uploadImage = async (
    filePath: string,
    folder?: string
): Promise<string> => {
    let response;

    if (folder) {
        response = await cloudinary.uploader.upload(filePath, {
            folder,
        });
    } else {
        response = await cloudinary.uploader.upload(filePath);
    }

    return response.secure_url;
};

export async function deleteImage(url: string) {
    const public_id = getPublicId(url);
    await cloudinary.uploader.destroy(public_id);
    return;
}

export async function updateImage(
    filePath: string,
    url: string,
    folder?: string
) {
    await deleteImage(url);
    const response = await uploadImage(filePath, folder);

    return response;
}

export const uploadMultipleImages = async (
    images: Array<Express.Multer.File>,
    folder?: string
) => {
    const response = await Promise.all(
        images.map(async image => {
            return await uploadImage(image.path, folder);
  
        })
    );
    return response;
};
