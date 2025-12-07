import { Button } from "@/components/ui/Button";
import { DropdownFiles } from "@/components/ui/DropdownFiles";
import { ModalDefaultProps, useModal } from "@/contexts/ModalContext";
import { ModalProvider } from "@/contexts/ModalProvider";
import { getCroppedImg } from "@/utils/cropImage";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Cropper from "react-easy-crop";

type UploadImageModalProps = ModalDefaultProps & {
    title: string;
    onUpload: (file: File) => void;
    aspect?: number;
};

export const UploadImageModal = ({
    title,
    onUpload,
    zIndex,
    aspect = 1,
}: UploadImageModalProps) => {
    const { closeModal } = useModal();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleFileSelect = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageSrc(reader.result as string);
        };
    };

    const handleUpload = async () => {
        if (imageSrc && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (croppedImage) {
                onUpload(croppedImage);
                closeModal();
            }
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="my-auto h-fit w-full max-w-[97%] rounded-2xl bg-white pb-4 lg:max-w-lg dark:bg-zinc-900"
            style={{ zIndex }}
        >
            <header className="flex items-center justify-between border-b-1 border-zinc-200 px-3 py-6 lg:px-5 dark:border-zinc-800">
                <div>
                    <h3 className="font-title text-title text-xl lg:text-2xl">{title}</h3>
                    <p className="text-subtitle text-sm">
                        {imageSrc ? "Ajuste a imagem" : "Selecione uma imagem para enviar"}
                    </p>
                </div>

                <ModalProvider.Close />
            </header>
            <main className="p-5">
                <AnimatePresence mode="wait">
                    {!imageSrc ? (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <DropdownFiles onUpload={handleFileSelect} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="crop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col gap-4"
                        >
                            <div className="relative h-64 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    onCropChange={setCrop}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={setZoom}
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    text="Cancelar"
                                    styleType="outlined"
                                    onClick={() => setImageSrc(null)}
                                />
                                <Button text="Confirmar" onClick={handleUpload} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </motion.div>
    );
};
