import { NextFunction, Request, Response } from "express";
import path from "path";

export const validationFile = (
    limitFile: number,
    sizeFile: number,
    typeFile: RegExp
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            if ((req.files?.length as number) > limitFile)
                throw new Error(
                    `File limit exceeded. You can send only ${limitFile} files.`
                );

            await Promise.all(
                (req.files as Express.Multer.File[]).map(async (file) => {
                    if (
                        !typeFile.test(
                            path.extname(file.originalname).toLowerCase()
                        )
                    )
                        throw new Error(
                            "File type invalid. Only '.png', '.jpeg' and '.jpg' are valid."
                        );

                    if (file.size > sizeFile)
                        throw new Error("File size exceeded.");
                })
            );

            next();
        } catch (err) {
            if (!(err instanceof Error)) throw err;
            res.status(401).json({ errors: err.message });
            return;
        }
    };
};
