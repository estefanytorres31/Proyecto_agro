import { connect } from "../database";
const QRCode = require ('qrcode');
const path = require('path');


export const getAllPlantas = async () => {
    const db = await connect();
    try {
        const plants = await db.execute('SELECT * FROM tb_planta');
        return plants;
    } catch (error) {
        throw new Error("Error al obtener plantas: " + error.message);
    } finally {
        db.end();
    }
};

export const getPlantaById = async (codigo_planta) => {
    const db = await connect();
    try {
        const [plant] = await db.execute('SELECT * FROM tb_planta WHERE codigo_planta =?', [codigo_planta]);
        return plant[0];
    } catch (error) {
        throw new Error("Error al obtener planta por ID: " + error.message);
    } finally {
        db.end();
    }
};

export const createPlanta = async (codigo_planta, planta_codigo_sector) => {
    const db = await connect();
    try {
        const qrPath = path.join(__dirname, `../qrcodes/${codigo_planta}.png`);
        
        await QRCode.toFile(qrPath, codigo_planta);

        const qrRelativePath = `/qrcodes/${codigo_planta}.png`;

        const planta = await db.execute(
            `INSERT INTO tb_planta (codigo_planta, codigo_qr, planta_codigo_sector) VALUES (?, ?, ?)`,
            [codigo_planta, qrRelativePath, planta_codigo_sector]
        );
        return planta;
    } catch (error) {
        throw new Error("Error al crear planta: " + error.message);
    } finally {
        db.end();
    }
}

export const createMultiplePlantas = async (cantidad, sectorCodigo) => {
    const db = await connect();
    try {
        await db.beginTransaction();

        for (let i = 1; i <= cantidad; i++) {

            const codigo_planta = `P${String(i).padStart(5, "0")}`;

            const qrPath = path.join(__dirname, `../qrcodes/${codigo_planta}.png`);
            await QRCode.toFile(qrPath, codigo_planta);

            const qrRelativePath = `/qrcodes/${codigo_planta}.png`;

            await db.execute(
                `INSERT INTO tb_planta (codigo_planta, codigo_qr, planta_codigo_sector) VALUES (?, ?, ?)`,
                [codigo_planta, qrRelativePath, sectorCodigo]
            );
            if (!sectorCodigo) {
                throw new Error("El código del sector es requerido.");
            }
        }
        

        await db.commit();
        console.log(`${cantidad} plantas registradas con éxito en el sector ${sectorCodigo}`);
    } catch (error) {
        await db.rollback();
        throw new Error("Error al crear múltiples plantas: " + error.message);
    } finally {
        db.end();
    }
};

export const updatePlantaTamano=async(codigo_planta, tamaño)=>{
    const db = await connect();
    try {
        const [planta]=await db.execute('UPDATE tb_planta SET tamaño=? where codigo_planta=?',
            [codigo_planta, tamaño]
        )
        return planta;
    } catch (error) {
        throw new Error("Error al actualizar tamaños de códigos QR: " + error.message);
    } finally {
        db.end();
    }
}

export const deletePlanta = async (codigo_planta) => {
    const db = await connect();
    try {
        await db.execute('UPDATE tb_planta SET estado=false where codigo_planta=?', [codigo_planta]);    
    } catch (error) {
        throw new Error("Error al eliminar planta: " + error.message);
    } finally {
        db.end();
    }
}


