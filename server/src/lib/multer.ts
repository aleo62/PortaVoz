import multer from "multer";

// Configuração do storage: mantém o nome original do arquivo
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// Instância do upload configurado
const upload = multer({ storage: storage });

export default upload;
