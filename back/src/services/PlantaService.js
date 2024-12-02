import { connect } from "../database";
const QRCode = require ('qrcode');
const fs = require('fs');
const path = require('path');
import { uploadImage } from "../utils/Cloudinary";
const sharp=require('sharp');


export const getAllPlantas = async () => {
    const db = await connect();
    try {
        const plants = await db.execute('SELECT * FROM tb_planta where estado=true');
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
        const result = await db.execute('SELECT * FROM tb_planta WHERE estado=true AND codigo_planta=?', [codigo_planta]);
        if (result[0].length === 0) {
            return null;  
        }
        return result[0][0];
    } catch (error) {
        throw new Error("Error al obtener planta por ID: " + error.message);
    } finally {
        db.end();
    }
};


export const createMultiplePlantas = async (cantidad, sectorCodigo) => {
    if (!cantidad || cantidad <= 0 || !sectorCodigo) {
        throw new Error("Cantidad y sectorCodigo son requeridos y deben ser válidos.");
    }

    const db = await connect();
    try {
        const [lastPlanta] = await db.execute('SELECT codigo_planta FROM tb_planta ORDER BY codigo_planta DESC LIMIT 1');
        const lastCode = lastPlanta.length > 0 ? parseInt(lastPlanta[0].codigo_planta.slice(1)) : 0;

        const uploadPromises = [];

        for (let i = 1; i <= cantidad; i++) {
            const codigo_planta = `P${String(lastCode + i).padStart(6, "0")}`;
            const tempFilePath = path.join(__dirname, `../qrcodes/${codigo_planta}.png`);

            const qrBuffer = await QRCode.toBuffer(codigo_planta);
            const resizedQRBuffer = await sharp(qrBuffer)
                .resize(200, 200) 
                .toBuffer();
            const textBuffer = Buffer.from(
                `<svg width="400" height="50" xmlns="http://www.w3.org/2000/svg">
                    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-family="Arial" fill="black">
                        ${codigo_planta}
                    </text>
                </svg>`
            );

            await sharp({
                create: {
                    width: 400,  
                    height: 450, 
                    channels: 4,
                    background: { r: 255, g: 255, b: 255, alpha: 1 }, 
                },
            })
                .composite([
                    { input: resizedQRBuffer, top: 100, left: 90 },
                    { input: textBuffer, top: 300, left: 0 },
                ])
                .toFile(tempFilePath);


            const uploadPromise = uploadImage(tempFilePath, codigo_planta)
                .then(async (result) => {
                    fs.unlinkSync(tempFilePath);

                    await db.execute(
                        `INSERT INTO tb_planta (codigo_planta, codigo_qr, planta_codigo_sector) VALUES (?, ?, ?)`,
                        [codigo_planta, result.secure_url, sectorCodigo]
                    );
                })
                .catch((error) => {
                    console.error(`Error al procesar ${codigo_planta}: ${error.message}`);
                    throw new Error(`Error en la subida de QR o inserción de planta: ${codigo_planta}`);
                });

            uploadPromises.push(uploadPromise);
        }

        await Promise.all(uploadPromises);

        console.log(`${cantidad} plantas registradas con éxito en el sector ${sectorCodigo}`);
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Error al crear múltiples plantas: " + error.message);
    } finally {
        db.end();
    }
};

export const updatePlantaTamano=async(codigo_planta, tamaño)=>{
    const db = await connect();
    try {
        const [planta]=await db.execute('UPDATE tb_planta SET tamaño=? where codigo_planta=?',
            [tamaño, codigo_planta]
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

