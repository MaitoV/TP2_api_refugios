import multer from "multer";
import path from 'path';
import { ErrorArchivoIncorrecto } from "./errorPersonalizado.js";

const storage = multer.memoryStorage();

const filtroArchivo = (req, file, cb) => {
    const tiposArchivo = /xlsx|xls/;
    const extension = tiposArchivo.test(path.extname(file.originalname).toLowerCase());

    if (extension) {
        cb(null, true);
    } else {
        cb(new ErrorArchivoIncorrecto(), false);
    }
};

const carga = multer({ 
    storage: storage,
    fileFilter: filtroArchivo
});

export default carga;