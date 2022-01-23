import { query } from './db'

export const getOne = async ({ id, id_cotizacion }) => {
    const rows = await query(
        'SELECT * FROM vista_detalle_cotizacion WHERE id = ? AND id_cotizacion = ?',
        [id, id_cotizacion]
    )
    return rows
}

export const getMultiple = async (id) => {
    const rows = await query(
        'SELECT * FROM vista_detalle_cotizacion WHERE id_cotizacion = ?',
        [id]
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
    return { message, id: result.insertId }
}

/**
 * 
 * @param {Array} detalles 
 */
export const insertMultiple = async (detalles) => {
    // let values = detalles.map(detalle => [detalle.id_cotizacion, detalle.id_producto, detalle.cantidad])
    // const result = await query(
    //     `INSERT INTO detalle_cotizacion (id_cotizacion, id_producto, cantidad) VALUES ${values}`
    // )

    let values = ''
    detalles.forEach(detalle => {
        values += `(${detalle.id_cotizacion}, ${detalle.id_producto}, ${detalle.cantidad}),`
    })
    values = values.slice(0, values.length - 1)
    const result = await query(
        `INSERT INTO detalle_cotizacion (id_cotizacion, id_producto, cantidad) VALUES ${values}`
    )

    let message = result.affectedRows !== 0 ? 'Quote detail created successfully' : 'Error in created Quote detail'
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
    return { message, id: detalle.id }
}

export const deleteOne = async (id) => {
    const result = await query(
        'DELETE FROM detalle_cotizacion WHERE id = ?',
        [
            id,
        ]
    )

    let message = result.affectedRows ? 'Quote detail delete successfully' : 'Error in deleted quote detail'
    return { message, id: id }
}