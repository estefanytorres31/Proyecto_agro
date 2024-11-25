import { connect } from "../database";

export const getAllFundos=async()=>{
    const db = await connect();
    try {
        const fundos = await db.execute('SELECT * FROM tb_fundo');
        return fundos;
    } catch (error) {
        throw new Error("Error al obtener plantas: " + error.message);
    } finally {
        db.end();
    }
}

export const getFundoById=async(codigo_fundo)=>{
    const db = await connect();
    try {
        const [fundo] = await db.execute('SELECT * FROM tb_fundo WHERE codigo_fundo =?', [codigo_fundo]);
        if (!fundo) {
            throw new Error("Fundo no encontrado");
        }
        return fundo;
    } catch (error) {
        throw new Error("Error al obtener planta: " + error.message);
    } finally {
        db.end();
    }
}

export const createFundo = async ()=>{
    
}
