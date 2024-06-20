import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 8080;
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA  || 'MEM'; 
const MONGO_STRING_CONEXION = process.env.MONGO_STRING_CONEXION || 'mongodb://127.0.0.1';
const MONGO_BASE = process.env.MONGO_BASE || 'test';
const JWT_SECRET = process.env.JWT_SECRET || 'mi-frase-secreta';

export default {
    PORT,
    MODO_PERSISTENCIA,
    MONGO_STRING_CONEXION,
    MONGO_BASE,
    JWT_SECRET 
}