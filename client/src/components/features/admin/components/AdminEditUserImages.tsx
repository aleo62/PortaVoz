import { UserData } from "@/types/userDataType";
import { Dispatch, SetStateAction } from "react";

type Images = {
    image: File | null;
    banner: File | null;
};

interface AdminEditUserImagesProps {
    images: Images;
    setImages: Dispatch<SetStateAction<Images>>;
    user: UserData;
}

export const AdminEditUserImages = ({ images, setImages, user }: AdminEditUserImagesProps) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Profile Picture
                </label>
                <div className="flex items-center gap-4">
                    <img
                        src={
                            images.image
                                ? URL.createObjectURL(images.image)
                                : user.image || `https://ui-avatars.com/api/?name=${user.username}`
                        }
                        alt="Profile"
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImages({ ...images, image: e.target.files?.[0] || null })
                        }
                        className="text-sm text-zinc-500 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-800 dark:file:text-zinc-300"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Banner
                </label>
                <div className="relative h-32 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    {(images.banner || user.banner) && (
                        <img
                            src={images.banner ? URL.createObjectURL(images.banner) : user.banner}
                            alt="Banner"
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImages({ ...images, banner: e.target.files?.[0] || null })}
                    className="text-sm text-zinc-500 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-800 dark:file:text-zinc-300"
                />
            </div>
        </div>
    );
};
