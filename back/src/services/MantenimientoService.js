import { connect } from "../database";

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

export const createMantenimiento=async(mantenimiento)=>{
    const db = await connect();
    try {
        const [result] = await db.execute('INSERT INTO tb_mantenimiento (mantenimiento, fecha_mantenimiento, mantenimiento_codigo_planta) VALUES (?,?,?)',
        [mantenimiento.mantenimiento, mantenimiento.fecha_mantenimiento, mantenimiento.mantenimiento_codigo_planta]);
        return {...mantenimiento, codigo_mantenimiento: result.insertId };
    } catch (error) {
        throw new Error("Error al crear mantenimiento: " + error.message);
    } finally {
        db.end();
    }
}

export const updateMantenimiento=async(codigo_mantenimiento, mantenimiento)=>{
    const db = await connect();
    try {
        const [result] = await db.execute('UPDATE tb_mantenimiento SET mantenimiento=?, fecha_mantenimiento=? WHERE codigo_mantenimiento=?',
        [mantenimiento.mantenimiento, mantenimiento.fecha_mantenimiento, codigo_mantenimiento]);
        return result.affectedRows > 0;
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