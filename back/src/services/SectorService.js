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
