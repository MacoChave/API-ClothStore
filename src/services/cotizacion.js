import { query } from './db'

export const getOne = async (id) => {
    const rows = await query(
        'SELECT * FROM vista_cotizacion WHERE id = ?',
        [id]
    );

    return rows;
};

export const getMultiple = async () => {
    const rows = await query(
        'SELECT * FROM vista_cotizacion'
    );

    return rows;
};

export const insertOne = async (cotizacion) => {
    const result = await query(
        'INSERT INTO cotizacion (id_cliente, soles, dolares, pesos) VALUES(?,?,?,?)',
        [
            cotizacion.id_cliente,
            cotizacion.soles,
            cotizacion.dolares,
            cotizacion.pesos,
        ]
    );

    let message = 'Error in creating quote'

    if (result.affectedRows) message = 'Quote created successfully'

    return { message };
};

export const updateOne = async (cotizacion) => {
    const result = await query(
        'UPDATE cotizacion SET soles = ?, dolares = ?, pesos = ?, fecha_modificado = CURRENT_TIMESTAMP WHERE id = ?',
        [
            cotizacion.soles,
            cotizacion.dolares,
            cotizacion.pesos,
            cotizacion.id
        ]
    );
    let message = 'Error in updating quote'

    if (result.affectedRows) message = 'Quote updated succesfully'

    return { message };
};

export const deleteOne = async (id) => {
    const result = await query(
        'DELETE FROM cotizacion WHERE id = ?',
        [
            id
        ]
    );
    let message = 'Error in deleting quote'

    if (result.affectedRows) message = 'Quote deleted succesfully'

    return { message };
};
