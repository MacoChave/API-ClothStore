import { query } from './db'

export const getOne = async (id) => {
    const rows = await query(
        'SELECT * FROM detalle_cotizacion WHERE id = ?',
        [id]
    )
    return rows
}

export const getMultiple = async () => {
    const rows = await query(
        'SELECT * FROM detalle_cotizacion'
    )
    return rows
}

export const insertOne = async (detalle) => {
    const result = await query(
        'INSERT INTO detalle_cotizacion (id_cotizacion, id_producto, cantidad) VALUES(?,?,?)',
        [
            detalle.id_cotizacion,
            detalle.id_producto,
            detalle.cantidad
        ]
    )

    let message = result.affectedRows ? 'Quote detail created successfully' : 'Error in created Quote detail'
    return { message }
}

export const updateOne = async (detalle) => {
    const result = await query(
        'UPDATE detalle_cotizacion SET id_producto = ?, cantidad = ? WHERE id = ?',
        [
            detalle.id_producto,
            detalle.cantidad,
            detalle.id,
        ]
    )

    let message = result.affectedRows ? 'Quote detail updated successfully' : 'Error in updated quote detail'
    return { message }
}

export const deleteOne = async (id) => {
    const result = await query(
        'DELETE detalle_cotizacion WHERE id = ?',
        [
            detalle.id,
        ]
    )

    let message = result.affectedRows ? 'Quote detail delete successfully' : 'Error in deleted quote detail'
    return { message }
}