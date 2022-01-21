import { deleteOne, getMultiple, getOne, insertOne, updateOne } from "../services/detalle-cotizacion"

export const getDetalleCotizacion = async (req, res) => {
    const { id } = req.params
    try {
        const result = await getOne(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const getAllDetalleCotizacion = async (req, res) => {
    try {
        const result = await getMultiple()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const createDetalleCotizacion = async (req, res) => {
    try {
        const result = await insertOne(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const updateDetalleCotizacion = async (req, res) => {
    try {
        const result = await updateOne(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const deleteDetalleCotizacion = async (req, res) => {
    const { id } = req.params
    try {
        const result = await deleteOne(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}