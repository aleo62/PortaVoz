import { AppError } from "@/errors/AppError";
import { NextFunction, Request, Response } from "express";
import path from "path";

export const validationFile = (
    limitFile: number,
    sizeFile: number,
    typeFile: RegExp,
    optional: boolean = false
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            if (optional) return next();
            return next(
                new AppError(
                    "Files are required",
                    400,
                    "FILE_REQUIRED",
                    "É necessário enviar imagens."
                )
            );
        }

        if (files.length > limitFile) {
            return next(
                new AppError(
                    `File limit exceeded. You can send only ${limitFile} files.`,
                    413,
                    "FILE_EXCEDED_LIMIT",
                    "Limite de Imagens excedido"
                )
            );
        }

        for (const file of files) {
            const ext = path.extname(file.originalname).toLowerCase();

            if (!typeFile.test(ext)) {
                return next(
                    new AppError(
                        "Invalid File Format.",
                        422,
                        "FILE_INVALID_FORMAT",
                        `Formato inválido. Aceitos: ${String(typeFile)
                            .replace(/[^\w|]/g, "")
                            .split("|")
                            .map((f) => "." + f)
                            .join(", ")}`
                    )
                );
            }

            if (file.size > sizeFile) {
                return next(
                    new AppError(
                        "File size exceeded.",
                        413,
                        "FILE_EXCEDED_LIMIT",
                        "Arquivo muito grande"
                    )
                );
            }
        }

        next();
    };
};
