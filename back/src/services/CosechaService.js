import { connect } from "../database";

export const createCosecha= async (tamaño_fruto, cosecha_codigo_planta)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('INSERT INTO tb_cosecha (tamaño_fruto, cosecha_codigo_planta) values (?,?)',
        [tamaño_fruto,cosecha_codigo_planta]);
        return fruto;
    }catch(error){
        throw new Error("Error al crear fruto: " + error.message);
    }finally{
        db.end();
    }
}

export const getCosechaByPlanta=async (cosecha_codigo_planta)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('SELECT * FROM tb_cosecha WHERE cosecha_codigo_planta=?',
        [cosecha_codigo_planta]);
        return fruto;
    }catch(error){
        throw new Error("Error al obtener fruto por planta: " + error.message);
    }
    finally{
        db.end();
    }
}

export const updateFrutoTamaño=async(codigo_cosecha,tamaño_fruto)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('UPDATE tb_cosecha SET tamaño_fruto=? where codigo_cosecha=?',
        [tamaño_fruto,codigo_cosecha]);
        
        const [updatedFruto]=await db.execute('select codigo_cosecha, tamaño_fruto from tb_cosecha where codigo_cosecha=?',
            [codigo_cosecha]
        )
        return {message: 'Mantenimiento actualizado con éxito.',affectedRows:fruto.affectedRows ,Fruto: updatedFruto[0]}
    }catch(error){
        throw new Error("Error al actualizar tamaño de fruto: " + error.message);
    }finally{
        db.end();
    }
}

export const deleteCosecha=async(codigo_cosecha)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('UPDATE tb_cosecha SET estado=false WHERE codigo_cosecha=?',
        [codigo_cosecha]);
        return fruto;
    }catch(error){
        throw new Error("Error al eliminar fruto: " + error.message);
    }finally{
        db.end();
    }
}

export const getCosechaById=async(codigo_cosecha)=>{
    const db= await connect();
    try{
        const [fruto]=await db.execute('SELECT * FROM tb_cosecha WHERE codigo_cosecha=?',
        [codigo_cosecha]);
        return fruto;
    }catch(error){
        throw new Error("Error al obtener fruto por ID: " + error.message);
    }finally{
        db.end();
    }
}

export const getAllCosechas = async ({ tamaño_fruto = '', fecha_registro = '', orderBy = 'fecha_registro', orderDirection = 'ASC' }) => {
    const db = await connect();
    try {
        let query = 'SELECT * FROM tb_cosecha WHERE estado = true';
        let params = [];

        if (tamaño_fruto) {
            query += ' AND tamaño_fruto = ?';
            params.push(tamaño_fruto);
        }

        if (fecha_registro) {
            query += ' AND fecha_registro = ?';
            params.push(fecha_registro);
        }

        const validOrderByFields = ['tamaño_fruto', 'fecha_registro'];
        const validOrderDirections = ['ASC', 'DESC'];

        if (validOrderByFields.includes(orderBy) && validOrderDirections.includes(orderDirection.toUpperCase())) {
            query += ` ORDER BY ${orderBy} ${orderDirection.toUpperCase()}`;
        } else {
            // Fallback a valores predeterminados
            query += ' ORDER BY fecha_registro ASC';
        }

        // Ejecutar la consulta
        const [frutos] = await db.execute(query, params);
        return frutos;
    } catch (error) {
        throw new Error("Error al obtener todos los frutos: " + error.message);
    } finally {
        await db.end();
    }
};

