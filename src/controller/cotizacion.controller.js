import pdf from 'html-pdf'
import { getHTML } from '../utils/invoice.PDF'

import { deleteOne, getMultiple, getOne, insertOne, updateOne } from "../services/cotizacion"
import { getMultiple as getDetails } from '../services/detalle-cotizacion'

export const getCotizacion = async (req, res) => {
    const { id } = req.params

    try {
        const result = await getOne(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const getAllCotizacion = async (req, res) => {
    try {
        const result = await getMultiple()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const createPDF = async (req, res) => {
    const { id } = req.params
    const cotizacion = await getOne(id)
    const detalles = await getDetails(id)

    pdf.create(
        getHTML(cotizacion, detalles),
        { format: 'Letter' }
    ).toStream((err, stream) => {
        if (err) return res.end(err.stack)
        res.setHeader('Content-type', 'application/pdf')
        stream.pipe(res)
    })
}

export const getPDF = async (req, res) => {
    res.status(200).json({ message: 'C:\Users\Marco\Proyectos\Visual Code\Store-Project\Backend\src\report\reporte.pdf' })
}

export const createCotizacion = async (req, res) => {
    try {
        const result = await insertOne(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const updateCotizacion = async (req, res) => {
    try {
        const result = await updateOne(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}

export const deleteCotizacion = async (req, res) => {
    const { id } = req.params
    try {
        const result = await deleteOne(id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.sqlMessage })
    }
}