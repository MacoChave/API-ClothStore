import { getMultiple, getOne, insertOne, updateOne } from "../services/producto"

export const getProducto = async (req, res) => {
    const { id } = req.params

    try {
        const result = await getOne(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const getAllProducto = async (req, res) => {
    const { page } = req.query

    try {
        const result = await getMultiple(page)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const createProducto = async (req, res) => {
    try {
        const result = await insertOne(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const updateProducto = async (req, res) => {
    try {
        const result = await updateOne(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}