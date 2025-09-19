import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Desarrollo de las funcionalidades
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// 1. Crear una carpeta donde se guarden los archivos subidos
const UPLOADS_FOLDER = path.join(_dirname, "../uploads/images");

// Si no existe la carpeta UPLOADS
if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true })
}

// 2. Especificar cómo vamos a guardar los archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
        cb(null, `${base}-${Date.now()}${ext}`);
    }
});


// 3. Qué tipo de archivos vamos a recibir
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/svg+xml",
        "image/bmp",
        "image/tiff"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true); //Si el archivo es permitido que lo guarde en la carpeta UPLOADS_FOLDER
    } else {
        cb(new Error("Archivo no permitido"), false); //No puede guardar el archivo
    }
}

// 4. Definir límites - tamaño de archivo
const limits = {
    fileSize: 5 * 1024 * 1024 //5MB
}

// 5. Exportar esas características
export const uploadByImage = multer({ storage, fileFilter, limits });