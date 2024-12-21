import { connect } from "../database.js";

export const getAllFundos=async()=>{
    const db = await connect();
    try {
        const fundos = await db.execute('SELECT * FROM tb_fundo where estado=true');
        return fundos;
    } catch (error) {
        throw new Error("Error al obtener plantas: " + error.message);
    } finally {
        await db.end();
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
        await db.end();
    }
}

export const createFundo = async (codigo_fundo, nombre_fundo, hectarea)=>{
    const db = await connect();
    try {
        const [result] = await db.execute('INSERT INTO tb_fundo (codigo_fundo, nombre_fundo, hectarea) VALUES (?,?,?)', 
            [codigo_fundo, nombre_fundo,hectarea]
        );
        return result.insertId;
    } catch (error) {
        throw new Error("Error al crear el fondo: " + error.message);
    } finally {
        await db.end();
    }
}

export const updateFundo = async (codigo_fundo, nombre_fundo, hectarea)=>{
    const db = await connect();
    try {
        const [result] = await db.execute('UPDATE tb_fundo SET nombre_fundo =?, hectarea =? WHERE codigo_fundo =?', 
            [nombre_fundo, hectarea, codigo_fundo]
        );
        if (result.affectedRows === 0) {
            throw new Error("Fundo no encontrado");
        }
        const [updatedFundo]=await db.execute('select nombre_fundo, hectarea, fecha_actualizacion from tb_fundo where codigo_fundo =?',
            [codigo_fundo]
        );
        return { message: 'Fundo actualizado con éxito.', affectedRows: result.affectedRows, Fundo: updatedFundo[0]};
    } catch (error) {
        throw new Error("Error al actualizar el fondo: " + error.message);
    } finally {
       await db.end();
    }
}

export const deleteFundo = async (codigo_fundo)=>{
    const db = await connect();
    try {
        const [result] = await db.execute('UPDATE tb_fundo SET estado=false WHERE codigo_fundo =?', [codigo_fundo]);
        if (result.affectedRows === 0) {
            throw new Error("Fundo no encontrado");
        }
    } catch (error) {
        throw new Error("Error al eliminar el fondo: " + error.message);
    } finally {
        await db.end();
    }
}

export const cantidadPorFundo = async (codigo_fundo) => {
    const db = await connect();
    try {
        const [cantidades] = await db.execute('CALL sp_cantidadFrutosPorFundo(?)',
            [codigo_fundo]
        );
        return cantidades[0]; 
    } catch (e) {
        throw new Error("Error al obtener cantidad por fundo: " + e.message);
    } finally {
        await db.end();
    }
}

export const getCantidadFrutosTotal = async () => {
    const db = await connect();
    try {
        const [results] = await db.query('CALL sp_cantidadFrutosTotal()');
        return results[0][0];
    } catch (error) {
        throw new Error("Error al obtener la cantidad de frutos: " + error.message);
    } finally {
        await db.end();
    }
}