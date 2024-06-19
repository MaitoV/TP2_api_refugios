import bcrypt from 'bcryptjs';

export const encriptarContrasenia = async (contrasenia) => {
    const rondasDeEncriptacion = parseInt(process.env.BCRYPT_N_ENCRIPTACION);
    const nivelEncriptacion = await bcrypt.genSalt(rondasDeEncriptacion); 
    const contraseniaEncriptada = await bcrypt.hash(contrasenia, nivelEncriptacion);
    return contraseniaEncriptada;
}