import * as MantenimientoService from "../services/MantenimientoService";

export const getAllMantenimientos = async (req, res) => {
    try {
        const { mantenimiento, fecha_mantenimiento, orderBy, sortOrder } = req.query;

        const queryParams = {};
        if (mantenimiento) queryParams.mantenimiento = mantenimiento;
        if (fecha_mantenimiento) queryParams.fecha_mantenimiento = fecha_mantenimiento;
        if (orderBy) queryParams.orderBy = orderBy;
        if (sortOrder) queryParams.sortOrder = sortOrder;

        const mantenimientos = await MantenimientoService.getAllMantenimientos(queryParams);

        if (mantenimientos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron mantenimientos' });  
        }

        return res.status(200).json(mantenimientos); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
};

export const getMantenimientoById = async (req, res) => {
    const { codigo_mantenimiento } = req.params;
    try {
        const mantenimiento = await MantenimientoService.getMantenimientoById(codigo_mantenimiento);
        if (!mantenimiento) {
            return res.status(404).json({ message: "Mantenimiento no encontrado" });
        }
        res.status(200).json(mantenimiento);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el mantenimiento" });
    }
}

export const createMantenimiento = async (req, res) => {
    const {mantenimiento}=req.body;
    try{
        const createdMantenimiento = await MantenimientoService.createMantenimiento(mantenimiento);
        res.status(201).json(createdMantenimiento);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al crear el mantenimiento"});
    }
}

export const updateMantenimiento = async (req, res) => {
    const { codigo_mantenimiento } = req.params;
    const {mantenimiento}=req.body;
    try{
        const updatedMantenimiento = await MantenimientoService.updateMantenimiento(codigo_mantenimiento, mantenimiento);
        if(!updatedMantenimiento){
            return res.status(404).json({ message: "Mantenimiento no encontrado" });
        }
        res.status(200).json(updatedMantenimiento);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al actualizar el mantenimiento"});
    }
}

export const deleteMantenimiento = async (req, res) => {
    const { codigo_mantenimiento } = req.params;
    try{
        await MantenimientoService.deleteMantenimiento(codigo_mantenimiento);
        res.status(200).json({message: "Mantenimiento eliminado"});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({message: "Error al eliminar el mantenimiento"});
    }
}