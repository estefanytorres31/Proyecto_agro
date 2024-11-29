import { connect } from "../database";

export const createFruto= async (tamaño_fruto, fruto_codigo_planta)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('INSERT INTO tb_fruto (tamaño_fruto, fruto_codigo_planta) values (?,?)',
        [tamaño_fruto,fruto_codigo_planta]);
        return fruto;
    }catch(error){
        throw new Error("Error al crear fruto: " + error.message);
    }finally{
        db.end();
    }
}

export const getFrutoByPlanta=async (fruto_codigo_planta)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('SELECT * FROM tb_fruto WHERE fruto_codigo_planta=?',
        [fruto_codigo_planta]);
        return fruto;
    }catch(error){
        throw new Error("Error al obtener fruto por planta: " + error.message);
    }
    finally{
        db.end();
    }
}

export const updateFrutoTamaño=async(codigo_fruto,tamaño_fruto)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('UPDATE tb_fruto SET tamaño_fruto=? where codigo_fruto=?',
        [tamaño_fruto,codigo_fruto]);
        return fruto;
    }catch(error){
        throw new Error("Error al actualizar tamaño de fruto: " + error.message);
    }finally{
        db.end();
    }
}

export const deleteFruto=async(codigo_fruto)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('UPDATE tb_fruto SET estado=false WHERE codigo_fruto=?',
        [codigo_fruto]);
        return fruto;
    }catch(error){
        throw new Error("Error al eliminar fruto: " + error.message);
    }finally{
        db.end();
    }
}

export const getFrutoById=async(codigo_fruto)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('SELECT * FROM tb_fruto WHERE codigo_fruto=?',
        [codigo_fruto]);
        return fruto;
    }catch(error){
        throw new Error("Error al obtener fruto por ID: " + error.message);
    }finally{
        db.end();
    }
}

export const getAllFrutos=async()=>{
    const db= await connect();
    try{
        const [frutos]=await db.execute('SELECT * FROM tb_fruto WHERE estado=true');
        return frutos;
    }catch(error){
        throw new Error("Error al obtener todos los frutos: " + error.message);
    }finally{
        db.end();
    }
}
