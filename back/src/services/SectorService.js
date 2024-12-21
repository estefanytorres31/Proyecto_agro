import { connect } from "../database.js";

export const getSumaFrutosSector= async(nombre_sector)=>{
    const db = await connect();
    try{
        const [frutoSector]=await db.execute('CALL sp_sumatoriaPorSectorNombre(?)',[nombre_sector]);
        return frutoSector[0][0];
    }catch(error){
        throw new Error("Error al obtener frutos por sector: " + error.message);
    }finally{
        await db.end();
    }
}

export const calculoPorSector=async(codigo_fundo, codigo_sector)=>{
    const db = await connect();
    try{
        const [calculo]=await db.execute('CALL sp_calculoPorSector(?,?)',
        [codigo_fundo, codigo_sector]);
        return calculo[0];
    }catch(error){
        throw new Error("Error al calcular por sector: " + error.message);
    }finally{
        await db.end();
    }
}