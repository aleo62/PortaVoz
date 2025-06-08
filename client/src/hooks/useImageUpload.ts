import { getSecretId } from "@/utils/secretId";

export const useImageUpload = () => {
    const upload = async (image: File, userImage: string) => {
        const data = new FormData();

        data.append("file", image);
        data.append("upload_preset", "upload_user_image");

        // HANDLE UPLOAD
        const res = await fetch(`http://localhost:4000/api/image/upload`, {
            method: "POST",
            body: data,
        });

        if (
            userImage !==
            "https://res.cloudinary.com/di5bma0gm/image/upload/v1748032813/default_image_wroapp.png"
        ) {
            await fetch(
                `http://localhost:4000/api/image/delete?public_id=${getSecretId(userImage)}`,
                {
                    method: "DELETE",
                },
            );
        }

        const uploadUrl = await res.json();
        return uploadUrl.image_url;
    };

    return { upload };
};
