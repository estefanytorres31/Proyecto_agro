import { connect } from "../database.js";

export const getAllMantenimientos = async ({ mantenimiento = '', fecha_mantenimiento = '', orderBy = 'fecha_mantenimiento', sortOrder = 'ASC' }) => {
    const db = await connect();
    try {
        let query = 'SELECT * FROM tb_mantenimiento WHERE estado = true';
        let params = [];

        if (mantenimiento) {
            query += ' AND mantenimiento LIKE ?';
            params.push(`%${mantenimiento}%`);
        }

        if (fecha_mantenimiento) {
            query += ' AND fecha_mantenimiento = ?';
            params.push(fecha_mantenimiento);
        }

        const validOrderByFields = ['mantenimiento', 'fecha_mantenimiento'];
        if (validOrderByFields.includes(orderBy)) {
            query += ` ORDER BY ${orderBy} ${sortOrder.toUpperCase()}`;
        } else {
            query += ' ORDER BY fecha_mantenimiento ASC';
        }
        const [mantenimientos] = await db.execute(query, params);
        return mantenimientos;
    } catch (error) {
        throw new Error("Error al obtener mantenimientos: " + error.message);
    } finally {
        db.end();
    }
};


export const getMantenimientoById=async(codigo_mantenimiento)=>{
    const db = await connect();
    try {
        const [mantenimiento] = await db.execute('SELECT * FROM tb_mantenimiento WHERE codigo_mantenimiento =?', [codigo_mantenimiento]);
        return mantenimiento[0];
    } catch (error) {
        throw new Error("Error al obtener mantenimiento por ID: " + error.message);
    } finally {
        db.end();
    }
}

export const createMantenimiento=async(mantenimiento, mantenimiento_codigo_planta)=>{
    const db = await connect();
    try {
        const [result] = await db.execute('INSERT INTO tb_mantenimiento (mantenimiento,  mantenimiento_codigo_planta) VALUES (?,?)',
        [mantenimiento, mantenimiento_codigo_planta]);
        
        const [createdMantenimiento]=await db.execute('select codigo_mantenimiento, mantenimiento, mantenimiento_codigo_planta from tb_mantenimiento where codigo_mantenimiento=?',
            [result.insertId]  
        );
        return createdMantenimiento[0];
    } catch (error) {
        throw new Error("Error al crear mantenimiento: " + error.message);
    } finally {
        db.end();
    }
}

export const updateMantenimiento=async(codigo_mantenimiento, mantenimiento, mantenimiento_codigo_planta)=>{
    const db = await connect();
    try {
        const [result] = await db.execute('UPDATE tb_mantenimiento SET mantenimiento=?, mantenimiento_codigo_planta=? WHERE codigo_mantenimiento=?',
        [mantenimiento, mantenimiento_codigo_planta, codigo_mantenimiento]);

        const [updatedMantenimiento]=await db.execute('SELECT codigo_mantenimiento, mantenimiento, mantenimiento_codigo_planta from tb_mantenimiento where codigo_mantenimiento=?',
            [codigo_mantenimiento]
        );
        return { message: 'Mantenimiento actualizado con éxito.', affectedRows: result.affectedRows, Mantenimiento: updatedMantenimiento[0]};
    } catch (error) {
        throw new Error("Error al actualizar mantenimiento: " + error.message);
    } finally {
        db.end();
    }
}

export const deleteMantenimiento=async(codigo_mantenimiento)=>{
    const db = await connect();
    try {
        const result = await db.execute('UPDATE tb_mantenimiento SET estado=false WHERE codigo_mantenimiento=?', [codigo_mantenimiento]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error("Error al eliminar mantenimiento: " + error.message);
    } finally {
        db.end();
    }
}